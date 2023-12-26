package com.labreport.backendlabrep.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
// import org.springframework.data.repository.PagingAndSortingRepository;

import com.labreport.backendlabrep.entity.Report;
import com.labreport.backendlabrep.entity.Technician;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long>{

    List<Report> findByFullName(String fullName);
    
    List<Report> findByTc(String tc);

    List<Report> findByWriter(Technician writer);

    @Deprecated
    List<Report> findAllByOrderByTc();// WTF!!! How does work this method???

    @Deprecated
    List<Report> findByWriterId(Long writerId);// 🤨 🤔
    
    @Deprecated
    @Query(
  value = "SELECT r.id, r.full_name, r.tc, r.diagnosis, r.details, r.report_date, t.full_name AS writerName FROM t_report r INNER JOIN t_technician t ON r.writer_id = t.id", 
  nativeQuery = true)
    List<Object[]> getReportsJoinWriter();


    // public static void mergedData() {
    //     List<reports> query = entityManager.createQuery("SELECT e.department FROM Employee e", Department.class);
    //     List<reports> resultList = query.getResultList();
    // }
}
