# Создание серверной части для приложения YOLO Trash Detection

1. Структура проекта

Необходимо создать файловую структуру вроде этой:

yolo_detection_app/
├── main.py            # Основной FastAPI код
├── models/            # Директория для нашей модели
│   └── best.pt        # наша модель
├── uploads/           # Создается автоматически - для загрузки изображений
├── results/           # Создается автоматически - для загрузки результатов
└── venv/              # Created when you set up virtual environment

2. Находясь в нашей корневой папке, создаем виртуальную среду
```bash
python -m venv venv

3. И активируем ее
```bash
venv\Scripts\activate

4. Устанавливаем необходимые для работы сервера зависимости
```bash
pip install fastapi uvicorn python-multipart pillow numpy ultralytics

5. Далее нужно скачать файл [main.py] из моего репозитория и руками положить его себе на локальную машину
   в корневую папку проекта.

6. Запустить проект
```bash
# Из корневой папки проекта с активированной виртуальной средой
python main.py

![launch server](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/unicorn.PNG)

7.Тестируем сервер:
При запуске сервера мы можем открыть в браузере среду и протестировать его работу: проверить,
что модель корректно загрузилась, папки создаются, фото летает и тд.
Для этого в браузере нужно перейти по адресу: http://localhost:8000/docs.
Откроется интерфейс SWAGGER

![Yolo Server](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/YOLO%20server.PNG)

 Можно везде потыкать, убедиться что фото загружаются.

Что сервер возвращает 200, все ок.

![200](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/code200.PNG)

Вот данные, которые скрипт готовит для отправки на `front`. Так классы с координатами bbox'ов и
и информация о ряде событий, которые мы хотим задетектить. Подробнее об этом будет сказано в документации к `frontend`


Само изображение с предсказаниями сохраняется в папке \result\detect

![prediction](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/detect.PNG)


8. Troubleshooting
1.	Model Not Found Error: 
- Make sure your best.pt file is in the models/ directory
-	Check if the path is correct in main.py (MODEL_PATH variable)
2.	Import Error for Ultralytics: 
-	Ensure you've installed the ultralytics package: pip install ultralytics
3.	Permission Issues: 
-	Make sure your application has write permissions to create the uploads/ and results/ directories
4.	Port Already in Use: 
-	Change the port number in the uvicorn.run() call or command line


