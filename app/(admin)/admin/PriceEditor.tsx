"use client";

import { PAX_OPTIONS, type RawCatalog } from "@/lib/catalog";
import { useState } from "react";
import { logout, savePrices, type AdminActionState } from "./actions";

export default function PriceEditor({
  catalog,
  storeReady,
}: {
  catalog: RawCatalog;
  storeReady: boolean;
}) {
  const [draft, setDraft] = useState(catalog);
  const [state, setState] = useState<AdminActionState>(null);
  const [pending, setPending] = useState(false);

  return (
    <main className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="eyebrow dark">FATAR Admin</p>
          <h1>Ubah harga paket & sewa mobil</h1>
          <p>
            {storeReady
              ? "Simpan akan menulis ke Supabase, lalu me-refresh landing page /en dan /id. Tidak perlu deploy ulang."
              : "URL Supabase sudah ada, tapi SUPABASE_SECRET_KEY masih kosong. Tanpa itu tombol simpan belum bisa menulis data."}
          </p>
        </div>
        <form action={logout}>
          <button className="btn btn-small" type="submit">
            Keluar
          </button>
        </form>
      </header>

      {!storeReady ? (
        <p className="admin-alert">
          Tambahkan SUPABASE_SECRET_KEY di .env.local, lalu jalankan supabase/schema.sql di SQL
          Editor Supabase. Publishable key hanya untuk membaca, bukan menyimpan.
        </p>
      ) : null}
      {state?.error ? <p className="admin-alert">{state.error}</p> : null}
      {state?.ok ? <p className="admin-ok">{state.ok}</p> : null}

      <form
        className="admin-stack"
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setState(null);
          const result = await savePrices(null, {
            currencyRates: draft.currencyRates,
            packages: draft.packages.map((item) => ({ slug: item.slug, prices: item.prices })),
            carRentals: draft.carRentals.map((item) => ({ name: item.name, prices: item.prices })),
          });
          setState(result);
          setPending(false);
        }}
      >
        <section className="admin-card">
          <h2>Kurs (dari MYR)</h2>
          <div className="admin-rate-grid">
            <label>
              1 MYR = IDR
              <input
                type="number"
                min="0"
                step="1"
                value={draft.currencyRates.IDR}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    currencyRates: { ...current.currencyRates, IDR: Number(event.target.value) },
                  }))
                }
              />
            </label>
            <label>
              1 MYR = SGD
              <input
                type="number"
                min="0"
                step="0.01"
                value={draft.currencyRates.SGD}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    currencyRates: { ...current.currencyRates, SGD: Number(event.target.value) },
                  }))
                }
              />
            </label>
          </div>
        </section>

        {draft.packages.map((item, index) => (
          <section className="admin-card" key={item.slug}>
            <h2>
              {item.title.id} <small>{item.duration}</small>
            </h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tipe</th>
                    {PAX_OPTIONS.map((pax) => (
                      <th key={pax}>{pax} pax</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["standard", "full"] as const).map((type) => (
                    <tr key={type}>
                      <th>{type === "standard" ? "Standard" : "Full"}</th>
                      {PAX_OPTIONS.map((pax) => (
                        <td key={pax}>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            aria-label={`${item.title.id} ${type} ${pax} pax`}
                            value={item.prices[type][pax] ?? 0}
                            onChange={(event) => {
                              const value = Number(event.target.value);
                              setDraft((current) => {
                                const packages = current.packages.map((pkg, pkgIndex) => {
                                  if (pkgIndex !== index) return pkg;
                                  return {
                                    ...pkg,
                                    prices: {
                                      ...pkg.prices,
                                      [type]: { ...pkg.prices[type], [pax]: value },
                                    },
                                  };
                                });
                                return { ...current, packages };
                              });
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="admin-hint">Harga paket dalam MYR per orang.</p>
          </section>
        ))}

        <section className="admin-card">
          <h2>Sewa mobil</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kendaraan</th>
                  <th>IDR</th>
                  <th>MYR</th>
                  <th>SGD</th>
                </tr>
              </thead>
              <tbody>
                {draft.carRentals.map((car, index) => (
                  <tr key={car.name}>
                    <th>{car.name}</th>
                    {(["IDR", "MYR", "SGD"] as const).map((currency) => (
                      <td key={currency}>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          aria-label={`${car.name} ${currency}`}
                          value={car.prices[currency]}
                          onChange={(event) => {
                            const value = Number(event.target.value);
                            setDraft((current) => {
                              const carRentals = current.carRentals.map((item, carIndex) =>
                                carIndex === index
                                  ? { ...item, prices: { ...item.prices, [currency]: value } }
                                  : item
                              );
                              return { ...current, carRentals };
                            });
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <button className="btn btn-dark admin-save" type="submit" disabled={pending || !storeReady}>
          {pending ? "Menyimpan & me-refresh landing page..." : "Simpan harga"}
        </button>
      </form>
    </main>
  );
}
