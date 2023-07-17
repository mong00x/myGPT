# MY GPT
MY GPT is a cutting-edge web application modeled after OpenAI's Generative Pre-training Transformer (GPT) API. Built with React.js and Django, it offers a highly interactive and engaging chatbot experience.

## Installation
Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/mong00x/myGPT.git
cd myGPT
```
Install the required dependencies:
• client side:
```
cd /client
npm install
```
• server side:
create your own python virtual environment and then:
```
cd /server
pip3 install -r requirements.txt
```

## Run the application

To start the development server:
```bash
# Navigate back to client directory
npm run dev
```

Run Django migrations (ensure you have Django installed):
```bash
# Navigate back to server directory
python manage.py migrate
```

To start the Django server:
```
python manage.py runserver
```

## Key Dependencies
Frontend dependencies:

* React.js and React DOM: JavaScript libraries for building user interfaces.
* Chakra-ui: A simple, modular and accessible component library for UIs.
* framer-motion: A production-ready motion library for React.
* axios: Promise-based HTTP client for the browser and Node.js.

## Backend dependencies:

* Django and djangorestframework: High-level Python Web framework and powerful and flexible toolkit for building Web APIs.
* django-cors-headers: A Django App that adds Cross-Origin Resource Sharing (CORS) headers to responses.
* aiohttp: Asynchronous HTTP client/server for asyncio and Python.
* awscli and boto3: Universal Command Line Interface for Amazon Web Services and the AWS SDK for Python.
* openai: The official OpenAI client library for Python.
and more...



## License
MIT

