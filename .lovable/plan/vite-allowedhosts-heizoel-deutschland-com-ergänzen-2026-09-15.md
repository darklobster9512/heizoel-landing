# Vite allowedHosts: heizoel-deutschland.com ergänzen

## Hintergrund
`vite.config.ts` enthält aktuell keine `allowedHosts`-Einstellung. Damit der Dev-/Preview-Server auch bei Zugriff über die Domain `heizoel-deutschland.com` (inkl. `www.`) antwortet und Vite die Anfragen nicht mit „Blocked request. This host is not allowed" abweist, wird die Domain ausdrücklich erlaubt.

## Änderung
In `vite.config.ts` die bestehende `defineConfig` um die Vite-Server-Option erweitern (kein Duplikat des bestehenden `tanstackStart.server.entry`):

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      allowedHosts: ["heizoel-deutschland.com", "www.heizoel-deutschland.com"],
    },
  },
});
```

## Prüfung
- Build läuft fehlerfrei durch (Build-Fehlerlog prüfen).
- Dev-Server antwortet weiterhin auf localhost:8080.
