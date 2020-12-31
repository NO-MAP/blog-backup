export const DB_CONFIG = () => {
  return {
    DB_HOST: 'localhost',
    DB_PORT: 3306,
    DB_USERNAME: 'root',
    DB_PASSWORD: '123456',
    DB_NAME: 'blog'
  }
}

export const JWT_CONFIG = () => {
  return {
    JWT_SECRET_KEY: 'a5465asd6as5d4as65d46sd',
    JWT_EXPIRES_IN: 60 * 60 * 24
  }
}
