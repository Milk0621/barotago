package com.barotago.backend.timetable.dao;

import com.barotago.backend.timetable.dao.mapper.TimetableMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Primary
public class TimetableDAOMyBatisImpl implements TimetableDAO{

    private final TimetableMapper mapper;

    public TimetableDAOMyBatisImpl(TimetableMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public List<Map<String, Object>> selectTimetableRaw(String stationCd, int weekTag) {
        return mapper.selectTimetableRaw(stationCd, weekTag);
    }
}
