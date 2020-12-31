export const DB_CONFIG = () => {
  return {
    HOST: 'localhost',
    PORT: 3306,
    USERNAME: 'root',
    PASSWORD: '123456',
    NAME: 'blog'
  }
}

export const JWT_CONFIG = () => {
  return {
    SECRET_KEY: 'a5465asd6as5d4as65d46sd',
    EXPIRES_IN: 60 * 60 * 24
  }
}
