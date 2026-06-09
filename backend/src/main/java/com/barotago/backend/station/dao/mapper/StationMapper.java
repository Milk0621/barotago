package com.barotago.backend.station.dao.mapper;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StationMapper {
    StationDetailResponseDTO findStationDetailById(@Param("stationId") int stationId);
    List<StationFacilityResponseDTO> findFacilitiesByStationId(@Param("stationId") int stationId);
}
