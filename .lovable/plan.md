# Vite allowedHosts: heizoel-deutschland.de ergänzen

## Hintergrund
`vite.config.ts` erlaubt bisher nur `heizoel-deutschland.com` und `www.heizoel-deutschland.com`. Die zusätzliche Domain `heizoel-deutschland.de` wird beim Zugriff auf den Dev-/Preview-Server mit „Blocked request. This host is not allowed" abgewiesen.

## Änderung
In `vite.config.ts` die Einträge im bestehenden `server.allowedHosts` ergänzen:

```ts
allowedHosts: [
  "heizoel-deutschland.com",
  "www.heizoel-deutschland.com",
  "heizoel-deutschland.de",
  "www.heizoel-deutschland.de",
],
```

Die `www`-Variante wird mit aufgenommen, damit auch Zugriffe über www funktionieren — analog zur .com-Domain.

## Prüfung
- Build läuft fehlerfrei durch (Build-Fehlerlog prüfen).
- Dev-Server antwortet weiterhin auf localhost:8080.
