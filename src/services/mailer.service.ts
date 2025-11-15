import sgMail from '@sendgrid/mail';
import { config } from '../config';
import { UserDTO } from '../types/DTOs';
import { logger } from '../lib';

const newUser = async (user: UserDTO, confirmToken?: string) => {
  try {
    const message = {
      to: user.email,
      from: {
        email: 'hola@houlak.com',
        name: 'Houlak',
      },
      templateId: config.sendgrid.newUser,
      dynamic_template_data: {
        userfirstName: user.firstName,
        confirmEmailURL: `${config.apiEndpoint}/users/confirm_email/${confirmToken}`,
      },
    };
    await sgMail.send(message);
    logger.info({ email: user.email }, 'send_welcome_email_error');
  } catch (err) {
    logger.error(
      {
        err: err.response.body,
        email: user.email,
      },
      'send_welcome_email_error',
    );
  }
};

const sendForgotPasswordMail = async (email: string, token: string, firstName: string) => {
  try {
    const message = {
      to: email,
      from: {
        email: 'hola@houlak.com',
        name: 'Houlak',
      },
      templateId: config.sendgrid.forgotPwd,
      dynamic_template_data: {
        firstName,
        restorePwdURL: `${config.apiEndpoint}/users/restore_password?token=${token}&env=${config.env}`,
      },
    };

    await sgMail.send(message);
    logger.info(`Forgot password email sended successfuly to ${email}`);
  } catch (err) {
    logger.error(err.response.body, `Error when sending forgot password email to ${email}`);
  }
};

export const mailerService = { newUser, sendForgotPasswordMail };
