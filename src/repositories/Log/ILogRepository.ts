import { Log } from '../../entities/log/Logs'

export interface ILogRepository {
  save(log: Log): Promise<Log>
  update(logId: string, update: Object): Promise<void>
}
