import ControllerMailer from '../src/controllers/ControllerMailer';
import { Request, Response } from 'express';


const mockResponse = () => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  

describe("pong", () => {

    test("should return ping-pong for pong()", async () => {
        const controller = new ControllerMailer();
        const mReq = {} as Request;
        const mResp = mockResponse();
        controller.pong(mReq, mResp);
        expect(mResp.status).toHaveBeenCalledWith(200);
        expect(mResp.json).toHaveBeenCalledWith({ping: "pong"});
    });

});