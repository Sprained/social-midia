import LogMongo from '../../../entities/log/implementations/LogMongo'
import { ILogRepository } from '../ILogRepository'
import { Log } from '../../../entities/log/Logs'

class LogRepositoryMongo implements ILogRepository {
  async save(log: Log): Promise<Log> {
    const logMongo = await LogMongo.create(log)

    return logMongo
  }

  async update(logId: string, update: Object): Promise<void> {
    await LogMongo.findOneAndUpdate({ _id: logId }, update)
  }
}

export default new LogRepositoryMongo()
