import { Request, Response } from "express";
import { SubProcessRepository } from "../repositories/subProcessRepository";
import { deleteResponse, internalServerErrorResponse, notFoundResponse, successfulRequestResponse } from "../utils/responseResults";

export class SubProcessController {
  private subProcessRepository: SubProcessRepository;

  constructor() {
    this.subProcessRepository = new SubProcessRepository();
  }

  async getSubProcesses(req: Request, res: Response) {
    try {
      const subProcesses = await this.subProcessRepository.findAll();

      return successfulRequestResponse(subProcesses, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async getSubProcessById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const subProcess = await this.subProcessRepository.findById(id);

      if (!subProcess) return notFoundResponse(res)

      return successfulRequestResponse(subProcess, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async getSubProcessByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const subProcess = await this.subProcessRepository.findByName(name);

      if (!subProcess) return notFoundResponse(res);

      return successfulRequestResponse(subProcess, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async createSubProcess(req: Request, res: Response) {
    try {
      const subProcessData = req.body;

      const errors = [];

      if (!subProcessData.name) errors.push('Name is required');

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: errors
        })
      }

      const subProcess = await this.subProcessRepository.create(subProcessData);

      return successfulRequestResponse(subProcess, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async updateSubProcess(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateSubProcess = req.body;

      const subProcess = await this.subProcessRepository.update(id, updateSubProcess);

      if (!subProcess) return notFoundResponse(res);

      return successfulRequestResponse(subProcess, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async deleteSubProcess(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedSubProcess = await this.subProcessRepository.delete(id);

      if (!deletedSubProcess) return notFoundResponse(res);

      return deleteResponse(res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }
}
