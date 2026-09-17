import { useState, useEffect } from "react";
import { getRate } from "../api/exchangeRate";

export const useExchangeRate = (base, target) => {
    const [rate, setRate] = useState(1);

    useEffect(() => {
        let mounted = true;

        async function fetchRate() {
            try {
                const fetchedRate = await getRate(base, target);
                if (mounted) setRate(Number(fetchedRate) || 1);
            } catch (_) { }
        }

        fetchRate();

        const interval = setInterval(fetchRate, 1000 * 60 * 60 * 12);
        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, [base, target]);

    return rate;
}
