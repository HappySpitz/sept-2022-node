import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { User } from "../dataBase";
import { EEmailActions } from "../enums";
import { emailService } from "../services";

dayjs.extend(utc);

const emailSender = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  const users = await User.find({ updatedAt: { $lte: previousMonth } });

  await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    users.map(async (user) => {
      await emailService.sendMail(
        "tatarkristina4@gmail.com",
        EEmailActions.REMINDER
      );
    })
  );
};

export const sendEmailReminder = new CronJob("0 0 * * *", emailSender);
