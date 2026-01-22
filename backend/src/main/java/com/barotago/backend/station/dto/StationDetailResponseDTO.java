package com.barotago.backend.station.dto;

public class StationDetailResponseDTO {
	private String stationCd;
	private String stationName;
	private String address;
	private double lat;
	private double lng;
	private String telno;
	
	public String getStationCd() {
		return stationCd;
	}
	public void setStationCd(String stationCd) {
		this.stationCd = stationCd;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLng() {
		return lng;
	}
	public void setLng(double lng) {
		this.lng = lng;
	}
	public String getTelno() {
		return telno;
	}
	public void setTelno(String telno) {
		this.telno = telno;
	}
}
