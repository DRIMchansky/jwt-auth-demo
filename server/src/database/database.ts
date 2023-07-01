abstract class Database {

  abstract connect(): Promise<void>
}

export { Database }
