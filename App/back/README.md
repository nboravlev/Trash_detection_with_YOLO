
# YOLO Trash Detection Server

Серверная часть приложения для детекции мусора с помощью YOLOv8 и FastAPI.

## 📁 Структура проекта

```
yolo_detection_app/
├── main.py           # Основной код FastAPI
├── models/           # Директория с моделью
│   └── best.pt       # Обученная модель YOLO
├── uploads/          # Автоматически создается для входящих изображений
├── results/          # Автоматически создается для результатов
└── venv/             # Виртуальная среда
```

## 🚀 Быстрый старт

1. Создайте виртуальную среду:

```bash
python -m venv venv
venv\Scripts\activate
```

2. Установите зависимости:

```bash
pip install fastapi uvicorn python-multipart pillow numpy ultralytics
```

3. Скачайте `main.py` из репозитория и разместите в корне проекта.

4. Запустите сервер:

```bash
python main.py
```

![Сервер запущен](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/unicorn.PNG)

## 🔍 Тестирование

Откройте [http://localhost:8000/docs](http://localhost:8000/docs) — это интерфейс Swagger для тестирования API.

![Swagger UI](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/YOLO%20server.PNG)

Убедитесь, что:

- Изображения загружаются
- Сервер возвращает статус `200 OK`

![Успешный ответ](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/code200.PNG)

## 🧠 Что возвращает сервер

Сервер формирует JSON-ответ с:

- Координатами и классами обнаруженных объектов (bbox)
- Статусами баков (`is_overfilled`)
- Признаками мусора вне баков и другими событиями

Результирующее изображение сохраняется в `results/detect/`:

![Результат](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/detect.PNG)

## 🛠 Troubleshooting

- **Model Not Found**: Убедитесь, что `best.pt` в `models/`
- **Ultralytics Import Error**: Установите `ultralytics`
- **Permission Denied**: Проверьте права на `uploads/` и `results/`
- **Port in Use**: Измените порт в `uvicorn.run()` или командной строке
