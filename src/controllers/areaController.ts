import { Request, Response } from "express";
import { AreaRepository } from "../repositories/areaRepository";
import { successfulRequestResponse, internalServerErrorResponse, notFoundResponse, deleteResponse } from "../utils/responseResults";

export class AreaController {
  private areaRepository: AreaRepository;

  constructor() {
    this.areaRepository = new AreaRepository();
  }

  async getAreas(req: Request, res: Response) {
    try {
      const areas = await this.areaRepository.findAll();

      return successfulRequestResponse(areas, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async getAreaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const area = await this.areaRepository.findById(id);

      if (!area) return notFoundResponse(res)

      return successfulRequestResponse(area, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async getAreaByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const area = await this.areaRepository.findByName(name);

      if (!area) return notFoundResponse(res);

      return successfulRequestResponse(area, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async createArea(req: Request, res: Response) {
    try {
      const areaData = req.body;

      const errors = [];

      if (!areaData.name) errors.push('Name is required');
      if (!areaData.color) errors.push('Color is required');
      if (!areaData.description) errors.push('Description is required');

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: errors
        })
      }

      const area = await this.areaRepository.create(areaData);

      return successfulRequestResponse(area, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async updateArea(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateArea = req.body;

      const area = await this.areaRepository.update(id, updateArea);

      if (!area) return notFoundResponse(res);

      return successfulRequestResponse(area, res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }

  async deleteArea(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedArea = await this.areaRepository.delete(id);

      if (!deletedArea) return notFoundResponse(res);

      return deleteResponse(res);
    } catch (error) {
      return internalServerErrorResponse(res);
    }
  }
}
