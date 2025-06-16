# Trash_detection_with_YOLO

Для обучения модели компьютерного зрения для детекции обектов я ипользовал фреймворк [Ultralitycs](https://docs.ultralytics.com/ru/).  

Данные собрал и разметил самостоятельно с помощью бесплатного инструмента [Label Studio](https://labelstud.io/guide). Готовый архив с данными уже лежит в корне этого проекта.

![label_studio](https://github.com/nboravlev/Trash_detection_with_YOLO/blob/main/Docs/label_studio.PNG)

Для обучения модели достаточно сохранить к себе локально ноутбук, открыть его в Google Colab и запустить последовательно код. Ноутбук снабжен подробными комментариями на русском языке, он сам установит все необходимые зависимости и окружение, подключится к GitHub. Необходимо просто сохранять последовательность и следовать комментариям.

После того, как модель обучена и версия с наилучшими показателями сохранена - следующий этап. Я реализовал браузерное приложение для работы с моделью. Оно принимает изображение, отправляет его на сервер в модель, также на `backend` обрабатываются результаты работы модели. И далее структурированные данные возвращаются на `frontend`, где результаты и вывод визуализируются в браузере. 
```mermaid
flowchart LR
%% User and Frontend %%
A((Browser)) -->
B[\"`__Frontend React App__
upload image
preveiw`"\]
%% Backend 
B --> |Upload image| C[(FastAPI Backend)]
C --> D{YOLO}
D --> |detect| E[Bussines Logic Checks]
E --> F["`_Tires Warning_`"]
E --> G["`_OutSide Trash Warning_`"]
E --> H["`_Bin Overfield Warning_`"]
D --> |detect| I

F --> I["`__JSON__
detection
tires warning
overfield bin
outside trash`"]
G --> I
H --> I
I --> |send JSON| J[\Frontend React App\]  
J --> K((Browser))
```
Подробнее с реализацией [**backend**](https://github.com/nboravlev/Trash_detection_with_YOLO/tree/main/App/back) и [**frontend**](https://github.com/nboravlev/Trash_detection_with_YOLO/tree/main/App/front) частей приложения можно ознакомиться в соответствующих разделах.


Пример реальной работы в приложении:
```mermaid
flowchart LR

    A[📸 Камера или Фото площадки]
    A --> B["`⬆️ Загрузка изображения`"]
    B --> C["`📦 YOLOv8 Object Detection`"]
    C --> D["`🧠 Постобработка детекций`"]
    
    D --> D1{"`Объект: tires?`"}
    D --> D2{"`Объект: trash вне bin?`"}
    D --> D3{"`Bin заполнен > порога?`"}

    D1 -->|Да| E1["`⚠️ Визуальный warning: Покрышки запрещены`"]
    D2 -->|Да| E2["`⚠️ Мусор вне баков`"]
    D3 -->|Да| E3["`⚠️ Бак переполнен`"]

    D1 -->|Нет| X1["`✓ OK`"]
    D2 -->|Нет| X2["`✓ OK`"]
    D3 -->|Нет| X3["`✓ OK`"]

    E1 --> F["`📤 Формирование отчёта`"]
    E2 --> F
    E3 --> F
    X1 --> F
    X2 --> F
    X3 --> F

    F --> G["`📄 JSON / HTML отчёт + результат с BBox`"]
    G --> H["`👀 Отображение на интерфейсе или Dashboard`"]

```
```mermaid
flowchart LR
%% User and Frontend %%
A((App)) -->|Upload image| C[(FastAPI Backend)]
C --> |batch| D[reddis]
C --> F1{Storage: Minio}
D --> F{YOLO}
F --> |detect| G[Postprocessing]
G --> I[JSON]
I --> H[BD: metadata, logs]
H --> J[Report]
```
