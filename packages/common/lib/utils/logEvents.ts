import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import formatDateTime from './formatDateTime';

export async function logEvents(message: string, logName: string) {
  const dateTime = `${formatDateTime(new Date(), { hour: '2-digit' })}`;
  const logItem = `${dateTime}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem,
    );
  } catch (err) {}
}
