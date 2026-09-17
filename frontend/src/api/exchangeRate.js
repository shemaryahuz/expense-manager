import { EXHANGE_RATE_URL } from "../constants/api/urlConstants";

export async function getRate(base, target) {
    try {
        if (base === target) throw new Error("base and target are the same")
        const res = await fetch(
            `${EXHANGE_RATE_URL}/${base}/${target}`
        );
        if (!res.ok) throw new Error("rate fetch failed");
        const json = await res.json();
        return json?.rate ?? 1;
    } catch (_) {
        return 1;
    }
}
