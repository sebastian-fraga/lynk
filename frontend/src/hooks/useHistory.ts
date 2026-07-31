import { useState } from "react";

import type { HistoryItem } from "../types/history";
import {
    getHistory,
    saveHistory,
    removeHistory,
    clearHistory,
} from "../utils/historyStorage";

export function useHistory() {
    const [history, setHistory] = useState<HistoryItem[]>(() => getHistory());

    function addItem(item: HistoryItem) {
        saveHistory(item);
        setHistory(getHistory());
    }

    function removeItem(id: string) {
        removeHistory(id);
        setHistory(getHistory());
    }

    function clear() {
        clearHistory();
        setHistory([]);
    }

    return {
        history,
        addItem,
        removeItem,
        clear,
    };
}