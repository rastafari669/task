# task
Create a local database named task_db -> utf8_general_ci in Mysql DB. Rename '.env.example' file to '.env'.

Inside the project root .env fill the database connection information.

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=8889

DB_DATABASE=task_db

DB_USERNAME=root

DB_PASSWORD=root

Open the terminal and navigate to reactfundapp folder and run npm i. Open a new terminal and navigate to laravelapi folder and follow the instructions:

Run composer install or php composer.phar install

Run php artisan key:generate

Run php artisan migrate

Run php artisan serve

The laravel server will start http://127.0.0.1:8000.

Make sure that the Mysql is properly activated as the data will be saved in a Mysql DB.

<img width="1599" alt="Screen Shot 2022-05-01 at 18 53 01" src="https://user-images.githubusercontent.com/48482551/166155260-cf38146c-4dc9-4bff-8542-7358f97ac5d8.png">
