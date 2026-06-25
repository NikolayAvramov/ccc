# Пълно ръководство: Ollama локално + интеграция в проекти

**Classic Car Center — Car Assistant (Ollama)**

---

## 1. Какво е Ollama и защо го ползваме

**Ollama** е програма, която пуска **AI модели локално** на твоя компютър (без OpenAI ключ, без интернет за самия inference).

- Слуша на: **http://127.0.0.1:11434**
- Имаш REST API (като облачен AI, но локално)
- Моделите се теглят с `ollama pull <име>`

В проекта Classic Car Center браузърът **не говори директно** с Ollama, а през **Next.js API route** (`/api/ollama`). Това е важно за:

- **CORS** — браузърът често блокира директни заявки към localhost:11434
- **Скрит system prompt** — правилата „само за коли“ са на сървъра, не в UI
- По-късно: rate limit, логове, authentication

---

## 2. Инсталация на Ollama (macOS)

### 2.1. Инсталирай Ollama

- От https://ollama.com — download за macOS
- Или терминал: `brew install ollama` (ако ползваш Homebrew)

### 2.2. Стартирай услугата

Обикновено приложението Ollama стартира сървъра автоматично. Провери:

```bash
curl http://127.0.0.1:11434/api/tags
```

Ако върне JSON с `models` — работи.

### 2.3. Свали модел (задължително поне един)

```bash
ollama pull llama3.2
```

Други примери (по-малки = по-бързи на слаб Mac):

```bash
ollama pull phi3
ollama pull mistral
ollama pull gemma2:2b
```

Списък на инсталирани:

```bash
ollama list
```

### 2.4. Тест от терминала (без Next.js)

```bash
ollama run llama3.2 "Какво е класическа кола?"
```

Или директно API:

```bash
curl http://127.0.0.1:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "Здравей"}],
  "stream": false
}'
```

---

## 3. Какво има в Classic Car Center (файлове)

| Файл | Роля |
|------|------|
| app/api/ollama/route.ts | Сървърен proxy към Ollama + system prompt „само коли“ |
| app/components/OllamaTest.tsx | UI: избор на модел, въпрос, показване на отговор |
| app/ollama-test/page.tsx | Страница на адрес /ollama-test |

По избор в `.env.local`:

```
OLLAMA_HOST=http://127.0.0.1:11434
```

Ако липсва — ползва се http://127.0.0.1:11434.

---

## 4. Как да го ползваш в Classic Car Center (стъпка по стъпка)

### Стъпка 1: Ollama да върви

1. Отвори приложението Ollama или пусни `ollama serve` (рядко е нужно ръчно).
2. Провери: `curl http://127.0.0.1:11434/api/tags`

### Стъпка 2: Имаш поне един модел

```bash
ollama pull llama3.2
```

### Стъпка 3: Next.js dev сървър

```bash
cd път/до/ccc
npm run dev
```

### Стъпка 4: Отвори тест страницата

В браузър: **http://localhost:3000/ollama-test**

### Стъпка 5: В UI

1. **Refresh models** — зарежда моделите от Ollama.
2. Избери **Model** (напр. llama3.2).
3. Напиши въпрос **само за коли**.
4. **Изпрати въпрос** — чакаш отговор (може 10–60+ сек. според Mac и модела).

### Стъпка 6: Какво се случва под капака

```
[Браузър]  →  POST /api/ollama  { model, prompt }
     ↓
[Next.js route.ts]  →  добавя system prompt „само коли“
     ↓
[Ollama]  POST http://127.0.0.1:11434/api/chat
     ↓
[Отговор]  →  JSON с поле response (текст)
```

- **GET** `/api/ollama` → проксира към Ollama GET /api/tags (списък модели).
- **POST** `/api/ollama` → проксира към Ollama POST /api/chat с role system (правила) и role user (въпрос).

---

## 5. API на проекта (за тест с Postman/curl)

### Списък модели

```bash
curl http://localhost:3000/api/ollama
```

### Въпрос към асистента

```bash
curl -X POST http://localhost:3000/api/ollama \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "prompt": "Какво е matching numbers при класическа кола?",
    "stream": false
  }'
```

Успех — в `response` е текстът на асистента.

**Грешки:**

- **503** — Ollama не работи / не е достъпен
- **502** — Ollama върна грешка (грешен model name, няма RAM и т.н.)
- **400** — липсва model или prompt

---

## 6. Ограничение „само въпроси за коли“

Това **не е твърд код**, а **system prompt** в `app/api/ollama/route.ts`:

- Моделът получава инструкции да отговаря само за автомобили.
- При off-topic трябва да откаже кратко.

**Важно:** Това е „меко“ ограничение. Малки модели понякога излизат извън темата. За по-строго: по-голям модел, втори проверяващ prompt, или keyword филтър на сървъра.

За друг домейн — сменяш текста на `CARS_ONLY_SYSTEM_PROMPT`.

---

## 7. Чести проблеми и решения

| Симптом | Причина | Решение |
|--------|---------|---------|
| Cannot connect to Ollama | Сървърът не върви | Стартирай Ollama app |
| Няма модели в dropdown | Не си pull-нал модел | ollama pull llama3.2 |
| Много бавно | Голям модел / слаб CPU | gemma2:2b, phi3 |
| model not found | Грешно име | ollama list — точно име |
| Празен отговор | Timeout / грешка | Логове в терминала |

---

## 8. Как да го пренесеш в друг Next.js проект

### 8.1. Копирай 3 неща

1. app/api/ollama/route.ts
2. app/components/OllamaTest.tsx
3. app/ollama-test/page.tsx

### 8.2. Настрой alias (ако няма @/)

В tsconfig.json: `"paths": { "@/*": ["./*"] }`

### 8.3. .env.local

```
OLLAMA_HOST=http://127.0.0.1:11434
```

### 8.4. Стартирай

```bash
npm run dev
# отвори /ollama-test
```

### 8.5. Вгради в реална страница

```tsx
import OllamaTest from "@/app/components/OllamaTest";

export default function VaultPage() {
  return (
    <div>
      <OllamaTest />
    </div>
  );
}
```

Или само fetch без целия UI:

```tsx
const res = await fetch("/api/ollama", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "llama3.2",
    prompt: userQuestion,
    stream: false,
  }),
});
const data = await res.json();
setAnswer(data.response);
```

---

## 9. Други типове проекти

### 9.1. React (Vite) без Next.js — нужен е backend

Express пример:

```js
import express from "express";
const app = express();
app.use(express.json());
const OLLAMA = "http://127.0.0.1:11434";

app.get("/api/ollama", async (_, res) => {
  const r = await fetch(`${OLLAMA}/api/tags`);
  res.json(await r.json());
});

app.post("/api/ollama", async (req, res) => {
  const { model, prompt } = req.body;
  const r = await fetch(`${OLLAMA}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: "system", content: "Your rules here..." },
        { role: "user", content: prompt },
      ],
    }),
  });
  const data = await r.json();
  res.json({ response: data.message?.content ?? "" });
});

app.listen(3001);
```

Vite proxy: `/api` → `http://localhost:3001`

### 9.2. Node.js (чист скрипт)

Директно към http://127.0.0.1:11434/api/chat — няма нужда от proxy (не е браузър).

### 9.3. Python

```python
import requests
r = requests.post(
    "http://127.0.0.1:11434/api/chat",
    json={
        "model": "llama3.2",
        "stream": False,
        "messages": [
            {"role": "system", "content": "Cars only..."},
            {"role": "user", "content": "Какво е VIN?"},
        ],
    },
    timeout=120,
)
print(r.json()["message"]["content"])
```

### 9.4. PHP / Laravel

Http::post от controller към 11434, не от frontend директно.

---

## 10. Ollama API (референция)

База: **http://127.0.0.1:11434**

| Endpoint | Метод | Употреба |
|----------|-------|----------|
| /api/tags | GET | Списък модели |
| /api/chat | POST | Разговор с roles (препоръчително) |
| /api/generate | POST | Един prompt string |
| /api/pull | POST | Свали модел |
| /api/ps | GET | Кои модели са в RAM |

### Chat body

```json
{
  "model": "llama3.2",
  "stream": false,
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "..." }
  ]
}
```

Отговор: `message.content`

---

## 11. Персонализация

| Искаш | Промени |
|-------|---------|
| Друга тема | CARS_ONLY_SYSTEM_PROMPT в route.ts |
| Фиксиран модел | Hardcode model в API |
| История на чата | Пази messages[] в state |
| По-бързо | По-малък модел |

---

## 12. Сигурност и production

**Локално:** Ollama само на твоя Mac — OK за тест.

**Онлайн:** Не излагай порт 11434; защити /api/ollama с login и rate limit.

**RAM:** 7B модел иска ~4–8 GB; на слаб Mac — 2B–3B модели.

---

## 13. Чеклист

1. curl http://127.0.0.1:11434/api/tags → OK
2. ollama list → има модел
3. npm run dev → OK
4. localhost:3000/ollama-test → модели се виждат
5. Въпрос за кола → отговор
6. Въпрос off-topic → отказ

---

## 14. Архитектура

**Този Next.js проект:** Browser → /api/ollama (Next) → Ollama :11434 + system prompt

**Друг Next.js:** Копирай route + компонент + OLLAMA_HOST

**React/Vite:** Browser → твой backend → Ollama

**Скрипт/Python:** Директно → 127.0.0.1:11434/api/chat

---

*Документ за Classic Car Center — генериран за локална Ollama интеграция.*
