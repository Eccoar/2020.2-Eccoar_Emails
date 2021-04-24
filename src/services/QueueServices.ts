import * as Queue from 'bull';
import { NodeMailerProvider } from '@services/NodeMailerProvider';
import { MailerProvider } from '@services/MailerProvider';
import * as env from 'dotenv';
import { EmailTemplate } from '@utils/EmailTemplate';

env.config();

const { REDIS_URL } = process.env;

export default class QueueServices {
	mailerProvider: MailerProvider;
	queue: Queue.Queue;
	options: Record<string, number>;

	constructor() {
		this.options = { attemps: 3, delay: 60000, static: 5000 };
		this.queue = new Queue('send-email-queue', REDIS_URL);
		this.mailerProvider = new NodeMailerProvider();
	}

	addMailQueue(email: EmailTemplate): void {
		this.queue.add(email, this.options);
	}

	emailQueueProcess(): void {
		console.log("TESTE MAILER");
		this.queue.process(async (job) => {
			console.log('>>>>> Process Job to Send EMAIL');
			await this.mailerProvider
				.sendMail(job.data)
				.then(() => {
					console.log('>>>>> Finish Send Email');
					job.moveToCompleted('done', true);
				})
				.catch((err) => {
					console.log('>>>> Job Failed: ' + err.message);
					job.moveToFailed({ message: err.message });
				});
		});
	}
}
