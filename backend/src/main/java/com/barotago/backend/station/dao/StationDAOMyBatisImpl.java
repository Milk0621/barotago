package com.barotago.backend.station.dao;

import com.barotago.backend.station.dto.StationDetailResponseDTO;
import com.barotago.backend.station.dto.StationFacilityResponseDTO;
import com.barotago.backend.station.dao.mapper.StationMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Primary
public class StationDAOMyBatisImpl implements StationDAO{

    private final StationMapper mapper;

    public StationDAOMyBatisImpl(StationMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public StationDetailResponseDTO findStationDetailById(int stationId) {
        return mapper.findStationDetailById(stationId);
    }

    @Override
    public List<StationFacilityResponseDTO> findFacilitiesByStationId(int stationId) {
        return mapper.findFacilitiesByStationId(stationId);
    }
}
