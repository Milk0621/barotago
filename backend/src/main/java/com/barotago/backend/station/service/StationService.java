package com.barotago.backend.station.service;

import com.barotago.backend.station.dto.StationDetailResponseDTO;

public interface StationService {
	StationDetailResponseDTO getStationInfo(int StationId);
}
