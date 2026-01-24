// lib/translate.ts
import arTranslations from '../locales/ar.json';

type Translations = typeof arTranslations;

/**
 * Reusable helper to get translation from a nested key
 * Fallbacks to the original text if no translation is found
 */
export function translateText(key: string, category: keyof Translations): string {
    if (!key) return '';

    const translations = arTranslations[category] as Record<string, string>;

    // Try to find exact match
    if (translations && translations[key]) {
        return translations[key];
    }

    // Fallback to original text
    return key;
}

/**
 * Translates product category
 */
export function translateCategory(category: string): string {
    return translateText(category, 'categories');
}

/**
 * Translates a single product feature
 */
export function translateFeature(feature: string): string {
    return translateText(feature, 'features');
}

/**
 * Translates an array of product features
 */
export function translateFeatures(features: (string | any)[]): string[] {
    if (!Array.isArray(features)) return [];

    return features.map(f => {
        const text = typeof f === 'string' ? f : (f.description || f.name || '');
        return translateFeature(text);
    });
}

/**
 * Translates product name
 */
export function translateProductName(name: string): string {
    return translateText(name, 'products');
}

/**
 * Translates product material
 */
export function translateMaterial(material: string): string {
    return translateText(material, 'materials');
}

/**
 * Translates product color
 */
export function translateColor(color: string): string {
    return translateText(color, 'colors');
}

/**
 * Translates product description
 */
export function translateDescription(description: string): string {
    return translateText(description, 'descriptions');
}

/**
 * Translates units (cm, kg, days, etc.)
 */
export function translateUnit(unit: string): string {
    if (!unit) return '';
    const u = unit.toLowerCase().trim();

    const unitMap: Record<string, string> = {
        'cm': 'سم',
        'kg': 'كجم',
        'working days': 'أيام عمل',
        'working day': 'يوم عمل',
        'days': 'أيام',
        'day': 'يوم',
        'meter': 'متر',
        'meters': 'أمتار',
        'inch': 'بوصة',
        'inches': 'بوصة'
    };

    return unitMap[u] || unit;
}

/**
 * Common UI translations with dynamic value support
 */
export function translateCommon(key: keyof Translations['common'], values?: Record<string, string | number>): string {
    let text = arTranslations.common[key] || key;

    if (values) {
        Object.entries(values).forEach(([k, v]) => {
            text = text.replace(`{${k}}`, v.toString());
        });
    }

    return text;
}
