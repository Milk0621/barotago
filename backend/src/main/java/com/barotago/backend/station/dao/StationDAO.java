package com.barotago.backend.station.dao;

import com.barotago.backend.station.dto.StationDetailResponseDTO;

public interface StationDAO {
	StationDetailResponseDTO findStationDetailById(int stationId);
}
