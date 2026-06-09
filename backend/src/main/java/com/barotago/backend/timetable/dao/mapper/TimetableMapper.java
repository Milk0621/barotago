package com.barotago.backend.timetable.dao.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TimetableMapper {
    List<Map<String, Object>> selectTimetableRaw(@Param("stationCd") String stationCd, @Param("weekTag") int weekTag);
}
