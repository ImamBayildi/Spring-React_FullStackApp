package com.labreport.backendlabrep.entity;

import java.util.Arrays;
import java.util.Date;

import jakarta.persistence.*;

@Table(name = "t_report")
@Entity
// @Data
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "report_seq")
    @SequenceGenerator(name = "report_seq", sequenceName = "report_seq", allocationSize = 1, initialValue = 1000000)
    @Column(name = "ID", nullable = false, unique = true)
    private Long id;

    @Column(name = "fullName", length = 150)
    private String fullName;

    @Column(nullable = false, unique = false, length = 11)
    private String tc;

    @Column(nullable = false, length = 200)
    private String diagnosis;

    private String details;// (255 character)

    @Temporal(TemporalType.DATE)
    private Date reportDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.REFRESH }) // EAGER => her raporu çektiğimde getir.
    @JoinColumn(name = "writer_ID")
    private Technician writer;

    @Column(name = "photo")
    @Lob // Big Data
    private byte[] photo;

    // <<<<Constructor>>>>
    public Report() {// WARN => Default Constructor'ı unutma!!!
    }

    public Report(String fullName, String tc, String diagnosis, String details,
            Date reportDate, Technician writer, byte[] photo) {
        this.fullName = fullName;
        this.tc = tc;
        this.diagnosis = diagnosis;
        this.details = details;
        this.reportDate = reportDate;
        this.writer = writer;
        this.photo = photo;
    }

    
    // <<<<<Getter & Setter>>>>>
    public Long getId() {
        return id;
    }

    // public void setId(Long id) {
    // this.id = id;
    // }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTc() {
        return tc;
    }

    public void setTc(String tc) {
        this.tc = tc;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Date getReportDate() {
        return reportDate;
    }

    public void setReportDate(Date reportDate) {
        this.reportDate = reportDate;
    }

    public Technician getWriter() {
        return writer;
    }

    public void setWriter(Technician writer) {
        this.writer = writer;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    // <<<<<ToString>>>>>
    @Override
    public String toString() {
        return "Report [id=" + id + ", fullName=" + fullName + ", tc=" + tc + ", diagnosis=" + diagnosis + ", details="
                + details + ", reportDate=" + reportDate + ", writer=" + writer + ", photo=" + Arrays.toString(photo)+ "]";
    }

    // <<<<<Hash & Equal>>>>>>
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((fullName == null) ? 0 : fullName.hashCode());
        result = prime * result + ((tc == null) ? 0 : tc.hashCode());
        result = prime * result + ((diagnosis == null) ? 0 : diagnosis.hashCode());
        result = prime * result + ((details == null) ? 0 : details.hashCode());
        result = prime * result + ((reportDate == null) ? 0 : reportDate.hashCode());
        result = prime * result + ((writer == null) ? 0 : writer.hashCode());
        result = prime * result + Arrays.hashCode(photo);
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Report other = (Report) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (fullName == null) {
            if (other.fullName != null)
                return false;
        } else if (!fullName.equals(other.fullName))
            return false;
        if (tc == null) {
            if (other.tc != null)
                return false;
        } else if (!tc.equals(other.tc))
            return false;
        if (diagnosis == null) {
            if (other.diagnosis != null)
                return false;
        } else if (!diagnosis.equals(other.diagnosis))
            return false;
        if (details == null) {
            if (other.details != null)
                return false;
        } else if (!details.equals(other.details))
            return false;
        if (reportDate == null) {
            if (other.reportDate != null)
                return false;
        } else if (!reportDate.equals(other.reportDate))
            return false;
        if (writer == null) {
            if (other.writer != null)
                return false;
        } else if (!writer.equals(other.writer))
            return false;
        if (!Arrays.equals(photo, other.photo))
            return false;
        return true;
    }

}
// @Transactional - jakarta EE ? SE :