/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface Paths {
  "/messages": {
    post: Operations["sendMessage"];
  };
}

export interface Components {
  schemas: {
    MessageCommon: {
      id?: string;
      /**
       * The from addrress of the email message.
       * This is the address to be used in the SMTP transaction itself.
       * Although it will be replaced with an address used for bounce handling.
       * This must match a `from:` header in the email headers.
       */
      from: string;
      /**
       * The To addrress of the email message.
       * This is the address to be used in the SMTP transaction itself.
       * This must match a `To:` header in the email headers.
       */
      to: string[] | string;
      /**
       * Whether to send this message in test mode.
       * This will validate the messge but no actually send it if true.
       * If the server is in test mode then it will always be in test mode
       * regardless of this value.
       */
      test_mode?: boolean;
      /** The subject of the email. This will override any subject set in headers or raw messages. */
      subject?: string;
      /** Tags to */
      tags?: string[] | string;
    };
    Message: Components["schemas"]["MessageCommon"] & {
      /**
       * The plain text part of the email message.
       * Either the plain text or the html parts are required.
       */
      plain?: string;
      /**
       * The HTML part of the email message.
       * Either the plain text or the html parts are required.
       */
      html?: string;
      headers?: { [key: string]: string };
      attachments?: Components["schemas"]["MessageAttachment"][];
    };
    MessageAttachment: {
      file_name: string;
      content: string;
      content_type: string;
      content_id?: string;
    };
    RawMessage: Components["schemas"]["MessageCommon"] & {
      /**
       * A full raw email.
       * This should consist of both headers and a message body.
       * `To` and `From` headers must be present and match those in the request.
       * Multiple parts, text and html or other mixed content are
       * acceptable but the message must be valid and RFC822 compliant.
       *
       * Any attachments intended to be sent in the Raw format must also be
       * encoded and included here.
       */
      raw?: string;
    };
    Error: {
      status?: number;
      error?: string;
    };
    UnauthorizedError: {
      status?: 401;
      error?: string;
    };
    ForbiddenError: {
      status?: 403;
      error?: "Forbidden";
    };
    NotFoundError: {
      status?: 404;
      error?: string;
    };
    UnprocessableEntityError: {
      status?: 422;
      /** The description of the failed validation */
      error?: string;
    };
    /** Identifier, please be aware that the format may change */
    accountID: string;
    /** Identifier, please be aware that the format may change */
    id: string;
  };
  responses: {
    /** The user is not Authorized */
    401: {
      content: {
        "application/json": Components["schemas"]["UnauthorizedError"];
      };
    };
    /** The user is not Authorized */
    403: {
      content: {
        "application/json": Components["schemas"]["ForbiddenError"];
      };
    };
    /** Resource be found or does not belong to this account */
    404: {
      content: {
        "application/json": Components["schemas"]["NotFoundError"];
      };
    };
    /** Unprocessable Entity, most likely your input does not pass validation */
    422: {
      content: {
        "application/json": Components["schemas"]["UnprocessableEntityError"];
      };
    };
  };
  parameters: {
    accountID: Components["schemas"]["accountID"];
  };
}

export interface Operations {
  sendMessage: {
    responses: {
      /** The message has been accepted */
      202: {
        content: {
          "application/json": Components["schemas"]["MessageCommon"];
        };
      };
      401: Components["responses"]["401"];
      422: Components["responses"]["422"];
    };
    requestBody: {
      content: {
        "application/json":
          | Components["schemas"]["Message"]
          | Components["schemas"]["RawMessage"];
      };
    };
  };
}
