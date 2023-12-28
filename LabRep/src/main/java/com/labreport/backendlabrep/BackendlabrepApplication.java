package com.labreport.backendlabrep;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.labreport.backendlabrep.dto.Role;
import com.labreport.backendlabrep.entity.Report;
import com.labreport.backendlabrep.entity.Technician;
import com.labreport.backendlabrep.repository.ReportRepository;
import com.labreport.backendlabrep.repository.TechnicianRepository;

@SpringBootApplication
public class BackendlabrepApplication implements CommandLineRunner {

	private final ReportRepository reportRepository;
	private final TechnicianRepository technicianRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public BackendlabrepApplication(ReportRepository reportRepository,
			TechnicianRepository technicianRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.reportRepository = reportRepository;
		this.technicianRepository = technicianRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendlabrepApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		generateRandomData(100,10);
		System.out.println("LabRep App is ready.. Visit to 'localhost:8080/'");
	}

	protected void generateRandomData(int reportLength, int imgLength) throws Exception {
		if (imgLength > 15) imgLength = 15;
		Set<Role> techRole = new HashSet<>();
		Role getTechRole = Role.ROLE_TECH;
		techRole.add(getTechRole);

		Role masterRole = Role.ROLE_MASTER;
		Set<Role> master = new HashSet<Role>();
		master.add(masterRole);

		System.out.println(getTechRole);

		String[] technicianNames = { "Ayşe Yılmaz", "Kıvanç Tatlıtuğ", "Damla Öztürk", "Ali Aydın", "Ahmet Kaya","Burak Koç", "Elif Nur Şahin", "Can Ergin", "Yasemin Taş", "Hüseyin Çelik" };
		String password = bCryptPasswordEncoder.encode("0000");
		technicianRepository.save(new Technician(null, "Özgür Yazılım", "bilgi@ozguryazilim.com.tr", password,
				generateRandomDate(), true,
				master, true, true, true, true));
		for (int i = 0; i < technicianNames.length; i++) {
			technicianRepository.save(new Technician(null, technicianNames[i], (technicianNames[i] + "@mail.com")
					.replaceAll("\\s", ""), password, generateRandomDate(), true,
					techRole, true, true, true,true));
		}

		String details = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
		String[] diagnosis = { "Karaciğer hasarı", "Alkolik Psikoz", "Alkol Zehirlenmesi", "Ensefalopati","Alkolik Hepatit", "Hemoglobin A1c", "Tam İdrar Tahlili", "Kan Glikozu", "Vitamin D Seviyesi","Tiroid Profili", "Pankreatit" };
		String[] names = { "Ahmet", "Mehmet", "Ayşe", "Mustafa", "Zeynep", "Burak", "Elif", "Yusuf", "Ceren" };
		String[] surNames = { "Yılmaz", "Demir", "Öztürk", "Aydın", "Kaya"};
		byte[][] images = getRandomImage(imgLength);

		for (int i = 0; i < reportLength; i++) {
			Long randomId = Math.round((Math.random() * (10 - 1)) + 1);
			int random1 = (int) ((Math.random() * (names.length - 0)) + 0);
			int random2 = (int) ((Math.random() * (surNames.length - 0)) + 0);
			int random3 = (int) ((Math.random() * (diagnosis.length - 0)) + 0);
			int imageLengthRandom = (int) ((Math.random() * (imgLength - 0)) + 0);
			System.out.println("Image Value : " + imageLengthRandom);
			int tc = (int) ((Math.random() * (100 - 0)) + 1735978300);
			String randomTc = "1" + String.valueOf(tc);
			String fullName = names[random1] + " " + surNames[random2];
			
			Technician randomTechnician = technicianRepository.findById(randomId).orElse(null);
			
			reportRepository.save(new Report(fullName, randomTc, diagnosis[random3], details, generateRandomDate(),
					randomTechnician, images[imageLengthRandom]));
		}
	}

	protected Date generateRandomDate() { // By CodeiumAI random Date generator
		LocalDate startDate = LocalDate.of(1990, 1, 1);
		LocalDate endDate = LocalDate.of(2023, 10, 6);

		long startMillis = startDate.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli();
		long endMillis = endDate.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli();
		long randomMillisSinceEpoch = ThreadLocalRandom.current().nextLong(startMillis, endMillis);

		return new Date(randomMillisSinceEpoch);
	}

	protected byte[][] getRandomImage(int x) throws Exception {
		URL url = new URL("https://picsum.photos/200/300");
		
		byte[][] imageArrays = new byte[x][];
		
		for (int index = 0; index < x; index++) {
			HttpURLConnection con = null;
			InputStream inputStream = null;
			ByteArrayOutputStream byteArrayOutputStream = null;
			
			try {
				con = (HttpURLConnection) url.openConnection();
				con.setRequestMethod("GET");
				con.setConnectTimeout(2005);
				con.setReadTimeout(2000);
				con.setInstanceFollowRedirects(true);// redirect authorization(false is not work this api)
		
				int responseCode = con.getResponseCode();
				System.out.println("status: "+responseCode);
		
				if (responseCode == HttpURLConnection.HTTP_OK) {
					inputStream = con.getInputStream();
					byteArrayOutputStream = new ByteArrayOutputStream();

					byte[] buffer = new byte[1024];
					int bytesRead;
					while ((bytesRead = inputStream.read(buffer)) != -1) {//By CodeiumAI
						byteArrayOutputStream.write(buffer, 0, bytesRead);
					}

					byte[] base64Image = ("data:image/png;base64," + Base64.getEncoder().encodeToString(
						byteArrayOutputStream.toByteArray())).getBytes();
					imageArrays[index] = base64Image;
					System.out.println("[INFO] - Random Image: " + byteArrayOutputStream.toByteArray().length);
				}
			} catch (Exception e) {
				System.out.println("[ERROR] - RandomImage API request is broken => " + e.getMessage());
			} finally {
				System.out.println("[INFO] - Connections closing..");
				con.disconnect();
				inputStream.close();
				byteArrayOutputStream.close();
			}
		}
		return imageArrays;
	}
}