import { PaginatedRequestParams, PaginatedResponse } from "interfaces/api.interface"
import { PropertyRepository } from "./properties.repository"
import { PropertyPayload } from "./properties.validation"
import { NotFoundError } from "errors/not-found"
import { Property } from "./properties.model"

export class PropertyService {
  private propertyRepository = new PropertyRepository()

  public async getProperties(params: PaginatedRequestParams): Promise<PaginatedResponse<Property>> {
    const properties = await this.propertyRepository.getProperties(params)

    return {
      data: properties,
      nextCursor:
        properties.length === params.limit ? { id: properties[properties.length - 1].id } : null
    }
  }

  public async createProperty(payload: PropertyPayload): Promise<Property> {
    return await this.propertyRepository.createProperty(payload)
  }

  public async getPropertyById(id: number): Promise<Property> {
    const property = await this.propertyRepository.getPropertyById(id)
    if (!property) {
      throw new NotFoundError("Property not found")
    }
    return property
  }

  public async updateProperty(id: number, propertyData: PropertyPayload): Promise<Property | null> {
    const property = await this.propertyRepository.updateProperty(id, propertyData)
    if (!property) {
      throw new NotFoundError("Property not found")
    }
    return property
  }

  public async deleteProperty(id: number): Promise<boolean> {
    const property = await this.propertyRepository.deleteProperty(id)
    if (!property) {
      throw new NotFoundError("Property not found")
    }
    return property
  }
}
