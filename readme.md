# Contraloria
pasos para instalacion
	- clonar proyecto
	- ejecutar composer install
	- ejecutar npm install
	- ejecutar php artisan key:generate
	- ejecutar php artisan jwt:secret
	- ejecutar comando composer dump-autoload
	- ejecutar comando php artisan db:seed

Dentro del proyecto renombrar archivo .env.example a .env
	cambiar valores de las siguientes variables

		DB_HOST=ip_host
		DB_PORT=puerto
		DB_DATABASE=nombre_base_datos
		DB_USERNAME=nombre_usuario
		DB_PASSWORD=contraseña_usuario