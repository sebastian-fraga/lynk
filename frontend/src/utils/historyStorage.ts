import type { HistoryItem } from "../types/history";

const STORAGE_KEY = "lynk-history";
const MAX_ITEMS = 15;

export function getHistory(): HistoryItem[] {
    const history = localStorage.getItem(STORAGE_KEY);

    if (!history) return [];

    try {
        return JSON.parse(history);
    } catch {
        return [];
    }
}

export function saveHistory(item: HistoryItem) {
    const history = getHistory();

    const filtered = history.filter(h => h.url !== item.url);

    filtered.unshift(item);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(filtered.slice(0, MAX_ITEMS))
    );
}

export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}

export function removeHistory(id: string) {
    const history = getHistory().filter(h => h.id !== id);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );
}