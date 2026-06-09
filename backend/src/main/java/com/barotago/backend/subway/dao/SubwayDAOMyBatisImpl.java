package com.barotago.backend.subway.dao;

import com.barotago.backend.subway.dao.mapper.SubwayMapper;
import com.barotago.backend.subway.domain.ServiceLine;
import com.barotago.backend.subway.dto.LineStationResponseDTO;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Primary
public class SubwayDAOMyBatisImpl implements SubwayDAO{

    private final SubwayMapper mapper;

    public SubwayDAOMyBatisImpl(SubwayMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public List<ServiceLine> selectMainLines() {
        return mapper.selectMainLines();
    }

    @Override
    public List<ServiceLine> selectChildLines(String parentCode) {
        return mapper.selectChildLines(parentCode);
    }

    @Override
    public List<LineStationResponseDTO> findStationByLineCode(String lineCode) {
        return mapper.findStationByLineCode(lineCode);
    }
}
