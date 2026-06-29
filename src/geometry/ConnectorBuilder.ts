import type { Part } from '../models/Part'

export class ConnectorBuilder {
  getTabLength(part: Part): number {
    return part.connectorSettings.length
  }

  getTabHeight(part: Part): number {
    return part.connectorSettings.height
  }

  getSlotLength(part: Part): number {
    return part.connectorSettings.length + part.connectorSettings.clearance
  }

  getSlotHeight(part: Part): number {
    return part.connectorSettings.height + part.connectorSettings.clearance
  }
}