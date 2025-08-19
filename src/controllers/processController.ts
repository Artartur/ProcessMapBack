import { Request, Response } from "express";
import { ProcessRepository } from "../repositories/processRepository";
import { deleteResponse, internalServerErrorResponse, notFoundResponse, successfulRequestResponse } from "../utils/responseResults";

export class ProcessController {
  private processRepository: ProcessRepository;

  constructor() {
    this.processRepository = new ProcessRepository();
  }

  async getProcesses(req: Request, res: Response) {
    try {
      const processes = await this.processRepository.findAll();

      return successfulRequestResponse(processes, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async getProcessById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const process = await this.processRepository.findById(id);

      if (!process) return notFoundResponse(res)

      return successfulRequestResponse(process, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async getProcessByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const process = await this.processRepository.findByName(name);

      if (!process) return notFoundResponse(res);

      return successfulRequestResponse(process, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async createProcess(req: Request, res: Response) {
    try {
      const processData = req.body;

      const errors = [];

      if (!processData.name) errors.push('Name is required');
      if (!processData.responsible) errors.push('Reponsible is required');

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: errors
        })
      }

      const process = await this.processRepository.create(processData);

      return successfulRequestResponse(process, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async updateProcess(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateProcess = req.body;

      const process = await this.processRepository.update(id, updateProcess);

      if (!process) return notFoundResponse(res);

      return successfulRequestResponse(process, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async deleteProcess(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedProcess = await this.processRepository.delete(id);

      if (!deletedProcess) return notFoundResponse(res);

      return deleteResponse(res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }
}
