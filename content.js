const sharedNav = `
  <nav class="page-nav" aria-label="Portfolio pages">
    <a href="index.html" data-page-link="home">Home</a>
    <a href="experience.html" data-page-link="experience">Experience</a>
    <a href="projects.html" data-page-link="projects">Projects</a>
    <a href="contact.html" data-page-link="contact">Contact</a>
  </nav>`;

const pageHeader = (eyebrow, title, intro) => `
  <header class="subpage-header">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p>${intro}</p>
  </header>`;

const footer = `
  <footer class="portfolio-footer">
    <span>© 2026 Haris Zubair</span>
    <a href="mailto:hzubair@uoguelph.ca">hzubair@uoguelph.ca</a>
  </footer>`;

const mediaSlideshow = (items = [], label = "Media gallery") => {
  const slides = items.length ? items : [1, 2, 3].map((number) => ({ type: "placeholder", number }));
  return `
    <section class="media-slideshow" data-slideshow aria-label="${label}">
      <div class="media-slides">
        ${slides.map((item, index) => {
          if (item.type === "video") {
            return `<figure class="media-slide${index === 0 ? " active" : ""}" data-slide-index="${index}"${index === 0 ? "" : " hidden"}>
              <video controls preload="metadata" playsinline aria-label="${item.alt}"><source src="${item.src}" type="video/mp4">Your browser does not support HTML video.</video>
              <button class="media-expand win-button" type="button" data-expand-media aria-label="Expand video">Expand video</button>
              <figcaption>${item.caption}</figcaption>
            </figure>`;
          }
          if (item.type === "placeholder") {
            return `<div class="media-slide${index === 0 ? " active" : ""}" data-slide-index="${index}"${index === 0 ? "" : " hidden"}><div class="project-image-slot">${item.text || `Add image ${item.number}`}</div></div>`;
          }
          return `<figure class="media-slide${index === 0 ? " active" : ""}" data-slide-index="${index}"${index === 0 ? "" : " hidden"}>
            <button class="media-open" type="button" data-expand-media aria-label="Expand ${item.alt}"><img src="${item.src}" alt="${item.alt}"><span>Click to expand</span></button>
            <figcaption>${item.caption}</figcaption>
          </figure>`;
        }).join("")}
      </div>
      <div class="slideshow-controls">
        <button class="win-button" type="button" data-slide-prev aria-label="Previous slide">&larr;</button>
        <span class="slide-count" aria-live="polite">1 / ${slides.length}</span>
        <button class="win-button" type="button" data-slide-next aria-label="Next slide">&rarr;</button>
      </div>
    </section>`;
};

const project = (number, title, date, description, tags, images = [], highlights = []) => `
  <article class="project-detail">
    <div class="project-media" aria-label="Image placeholders for ${title}">
      ${mediaSlideshow(images, `${title} media`)}
    </div>
    <div class="project-copy">
      <div class="project-number">${number}</div>
      <h2>${title}</h2>
      ${date ? `<time class="project-date">${date}</time>` : ""}
      <p>${description}</p>
      ${highlights.length ? `<ul class="project-highlights">${highlights.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      <p class="tag-list">${tags.map((tag) => `<span>${tag}</span>`).join("")}</p>
    </div>
  </article>`;

const experienceMedia = {
  "01": [
    { src: "images/experience/hps.jpg", alt: "Hammond Power Solutions logo", caption: "Hammond Power Solutions — AI software engineering for electrical-transformer design." }
  ],
  "02": [
    { src: "images/experience/roboticsinst.png", alt: "Robotics Institute at Guelph logo", caption: "Robotics Institute at Guelph — rehabilitation and assistive robotics research." },
    { src: "images/experience/roboticsinstlab.jpg", alt: "Haris with colleagues in the Robotics Institute lab", caption: "The Robotics Institute team in the rehabilitation and assistive robotics laboratory." }
  ],
  "03": [
    { src: "images/experience/ugrt_logo.jpg", alt: "University of Guelph Robotics Team logo", caption: "University of Guelph Robotics Team." },
    { src: "images/experience/oldrover.jpg", alt: "University of Guelph Robotics Team rover", caption: "Old rover design." },
    { src: "images/experience/newroverdesign.png", alt: "New University of Guelph Robotics Team rover design", caption: "New rover design." }
  ],
  "04": [
    { src: "images/experience/undergradresearch.png", alt: "CT scan examples from intracranial hemorrhage research", caption: "Example head CT slices representing the medical-imaging data used for hemorrhage classification." }
  ],
  "05": [
    { src: "images/experience/ieeelogo.png", alt: "IEEE University of Guelph student branch logo", caption: "IEEE University of Guelph Student Branch." },
    { src: "images/experience/ieeecar.png", alt: "Student-built IEEE workshop car with electronics and wiring", caption: "Interactive workshop car integrating the custom chassis, motor drive, wiring, and controller." }
  ]
};

const experience = (number, title, organization, date, bullets, tags, media = []) => `
  <article class="experience-record${number === "00" ? " future-role" : ""}">
    <div class="record-marker">${number}</div>
    <div class="experience-content">
      <div class="experience-media">${mediaSlideshow(media.length ? media : experienceMedia[number] || [], `${title} media`)}</div>
      <div class="record-body">
        <div class="record-heading"><div><h2>${title}</h2><p>${organization}</p></div><time>${date}</time></div>
        <ul>${bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
        <p class="tag-list">${tags.map((tag) => `<span>${tag}</span>`).join("")}</p>
      </div>
    </div>
  </article>`;

const pages = {
  home: `
    <header class="portfolio-header" id="home">
      <figure class="home-portrait">
        <img src="images/profile/profile-pixelated.png" alt="Pixel-art portrait of Haris Zubair" onerror="this.hidden=true; this.nextElementSibling.hidden=false">
        <span hidden>Place photo at<br><b>images/profile/profile.jpg</b></span>
      </figure>
      <div class="hero-copy">
        <p class="eyebrow">Computer &amp; Electrical Engineering</p>
        <h1>Haris Zubair</h1>
        <p class="portfolio-title">Embedded systems, Hardware Design &amp; Machine Learning</p>
      </div>
      <div class="hero-actions">
        <span class="availability"><span aria-hidden="true"></span> Open to engineering opportunities</span>
        <a class="win-button" href="default res.pdf" download>Download Resume</a>
      </div>
    </header>
    ${sharedNav}
    <div class="home-overview">
      <section class="portfolio-panel">
        <div class="panel-title">About Me</div>
        <div class="panel-content">
          <h2>Building across hardware and software</h2>
          <p>Hello! My name is Haris Zubair, and I’m a fourth-year Computer Engineering student at the University of Guelph. I have experience in robotics, electrical design, 
          and machine learning through various clubs and work experiences. I can build practical systems spanning custom PCBs, 
          embedded firmware, robotics, and engineering AI systems. I'm currently seeking a  co-op/internship position for Summer 2027 within the hardware/electrical/electronics domain, feel free to contact me if you'd like to learn more about me. Thank you!</p>
          <p class="home-facts">3.7 GPA &middot; Dean's Honour List &middot; Expected graduation May 2028</p>
        </div>
      </section>
      <section class="portfolio-panel">
        <div class="panel-title">Technical Tools & Skills</div>
        <div class="panel-content compact-skills">
          <p class="tag-list"><span>STM32</span><span>ESP32</span><span>FPGA</span><span>KiCad</span><span>Python</span><span>C/C++</span><span>VHDL</span><span>ROS2</span><span>SolidWorks</span><span>PyTorch</span><span>Tensorflow</span><span>Verilog</span></p>
        </div>
      </section>
      <section class="portfolio-panel">
        <div class="panel-title">Education</div>
        <div class="panel-content">
          <article class="home-education">
            <div class="record-heading">
              <div><h2>Bachelor of Engineering, Computer Engineering</h2><p>Co-operative Education · University of Guelph</p></div>
              <time>Sep 2023 — May 2028</time>
            </div>
            <p>Department of Computer and Electrical Engineering · Guelph, Ontario</p>
            <ul>
              <li>College of Engineering Dean's Honour List with a 3.7 GPA.</li>
              <li>Relevant coursework includes Digital System Design, Electric Circuits, Computer Organization, Microcomputer Interfacing, Electronic Devices, Signal Processing, Data Structures, and Engineering Design.</li>
            </ul>
          </article>
        </div>
      </section>
      <section class="portfolio-panel">
        <div class="panel-title">Certifications</div>
        <div class="panel-content">
          <div class="certificate-grid home-certificates">
            <article><h3>DeepLearning.AI Agentic AI</h3><p>Agentic design patterns using Python · 2026</p></article>
            <article><h3>SolidWorks CSWA</h3><p>Certified SolidWorks Associate · 2025</p></article>
            <article><h3>Kaggle Course Certificates</h3><p>Python, Pandas, machine learning, deep learning, and computer vision · 2025</p></article>
            <article><h3>IEEE CASSBLITZ</h3><p>Digital and analog circuits examination · 2025</p></article>
          </div>
        </div>
      </section>
    </div>
    <div class="home-directory">
      <a class="directory-card home-extra-link" href="about.html">
        <span class="directory-icon" aria-hidden="true">📄</span>
        <span><b>About &amp; Education</b><small>Background, coursework, certifications</small></span>
      </a>
      <a class="directory-card home-extra-link" href="skills.html">
        <span class="directory-icon" aria-hidden="true">🛠️</span>
        <span><b>Technical Tools & Skills</b><small>Hardware, programming, tools</small></span>
      </a>
      <a class="directory-card" href="experience.html">
        <span class="directory-icon" aria-hidden="true">💼</span>
        <span><b>Experience</b><small>AI, robotics, research, leadership</small></span>
      </a>
      <a class="directory-card" href="projects.html">
        <span class="directory-icon" aria-hidden="true">📁</span>
        <span><b>Engineering Projects</b><small>PCB, FPGA, embedded, mechanical</small></span>
      </a>
      <a class="directory-card" href="contact.html">
        <span class="directory-icon" aria-hidden="true">✉️</span>
        <span><b>Contact</b><small>Email, LinkedIn, resume</small></span>
      </a>
    </div>
    <section class="feature-band home-extra-link">
      <div><span class="metric">3.7</span><span>GPA · Dean's Honour List</span></div>
      <div><span class="metric">4</span><span>Layer PCB designs</span></div>
      <div><span class="metric">42K</span><span>DICOM images analyzed</span></div>
      <div><span class="metric">2028</span><span>Expected graduation</span></div>
    </section>
    ${footer}`,

  about: `
    ${sharedNav}
    ${pageHeader("About", "Building across boundaries", "Computer engineering gives me room to move between circuits, code, intelligent systems, and the physical machines they control.")}
    <div class="content-columns">
      <main class="content-main">
        <section class="readable-section">
          <h2>Profile</h2>
          <p>I am a Computer Engineering co-op student at the University of Guelph with experience in electrical design software, biomedical robotics, medical image analysis, and student robotics leadership.</p>
          <p>My work ranges from designing and soldering four-layer STM32 motor-control boards to developing transformer-design AI tools with Python, PyTorch, FAISS, Azure OpenAI, and Microsoft AI Foundry. I enjoy projects where software must respect real electrical, mechanical, and safety constraints.</p>
        </section>
        <section class="readable-section">
          <h2>Education</h2>
          <article class="record-card">
            <div class="record-heading">
              <div><h3>Bachelor of Engineering, Computer Engineering</h3><p>Co-operative Education · University of Guelph</p></div>
              <time>Sep 2023 — May 2028</time>
            </div>
            <p>Department of Computer and Electrical Engineering · Guelph, Ontario</p>
            <ul>
              <li>College of Engineering Dean's Honour List with a 3.7 GPA.</li>
              <li>Coursework includes Digital System Design, Electric Circuits, Computer Organization, Microcomputer Interfacing, Electronic Devices, Signal Processing, Data Structures, and Engineering Design.</li>
            </ul>
          </article>
        </section>
        <section class="readable-section">
          <h2>Certifications</h2>
          <div class="certificate-grid">
            <article><h3>DeepLearning.AI Agentic AI</h3><p>Agentic design patterns using Python · 2026</p></article>
            <article><h3>SolidWorks CSWA</h3><p>Certified SolidWorks Associate · 2025</p></article>
            <article><h3>Kaggle Course Certificates</h3><p>Python, Pandas, ML, deep learning, and computer vision · 2025</p></article>
            <article><h3>IEEE CASSBLITZ</h3><p>Digital and analog circuits examination · 2025</p></article>
          </div>
        </section>
      </main>
      <aside class="content-sidebar portfolio-panel">
        <div class="panel-title">Quick Facts</div>
        <dl class="quick-facts panel-content">
          <div><dt>Program</dt><dd>Computer Engineering Co-op</dd></div>
          <div><dt>School</dt><dd>University of Guelph</dd></div>
          <div><dt>Location</dt><dd>Guelph, Ontario</dd></div>
          <div><dt>Focus</dt><dd>Embedded, hardware, AI</dd></div>
          <div><dt>Graduation</dt><dd>May 2028</dd></div>
        </dl>
      </aside>
    </div>
    ${footer}`,

  skills: `
    ${sharedNav}
    ${pageHeader("Technical Skills", "Tools for the whole system", "From schematic capture and board bring-up to firmware, robotics middleware, machine learning, and cloud deployment.")}
    <div class="skill-page-grid">
      <section class="skill-window"><div class="panel-title">Hardware &amp; Platforms</div><div class="panel-content"><p class="tag-list large"><span>STM32</span><span>ESP32</span><span>Arduino</span><span>Raspberry Pi 4</span><span>NVIDIA Jetson Xavier</span><span>Nexys 3 / A7 FPGA</span><span>FANUC</span><span>KUKA</span></p><p>Board-level design, soldering, bring-up, motor control, sensor integration, wiring harnesses, and electrical troubleshooting.</p></div></section>
      <section class="skill-window"><div class="panel-title">Programming</div><div class="panel-content"><p class="tag-list large"><span>Python</span><span>C++</span><span>C</span><span>VHDL</span><span>Verilog</span><span>ARM Assembly</span><span>MATLAB</span><span>Java</span><span>SQL</span><span>JavaScript</span><span>React Native</span></p><p>Embedded firmware, object-oriented applications, hardware description, data processing, mobile interfaces, and engineering automation.</p></div></section>
      <section class="skill-window"><div class="panel-title">Electrical &amp; Mechanical Design</div><div class="panel-content"><p class="tag-list large"><span>KiCad</span><span>LTspice</span><span>AutoCAD</span><span>SolidWorks</span><span>Bambu Studio</span><span>Oscilloscope</span><span>Multimeter</span></p><p>Four-layer PCB design, circuit simulation, schematics, technical drawings, precision measurement, 3D assemblies, and additive manufacturing.</p></div></section>
      <section class="skill-window"><div class="panel-title">AI, Cloud &amp; Development</div><div class="panel-content"><p class="tag-list large"><span>PyTorch</span><span>TensorFlow</span><span>FAISS</span><span>Azure OpenAI</span><span>AI Foundry</span><span>Azure</span><span>AWS</span><span>Docker</span><span>Git</span><span>Ubuntu</span><span>WSL2</span></p><p>Similarity models, deep learning pipelines, retrieval agents, authenticated web apps, SQL logging, containers, and collaborative version control.</p></div></section>
      <section class="skill-window"><div class="panel-title">Embedded &amp; Robotics Toolchain</div><div class="panel-content"><p class="tag-list large"><span>Xilinx Vivado</span><span>STM32CubeIDE</span><span>ROS2</span><span>Gazebo</span><span>WebSocket</span><span>BLE</span><span>CAN-FD</span><span>UART</span><span>I2C</span><span>RS485</span></p><p>FPGA simulation, MCU development, robotics communication, wireless control, industrial buses, and motion-system integration.</p></div></section>
      <section class="skill-window"><div class="panel-title">Engineering Practice</div><div class="panel-content"><p class="tag-list large"><span>Electrical Safety</span><span>WHMIS</span><span>Datasheets</span><span>Technical Reports</span><span>Team Leadership</span><span>Lab Testing</span></p><p>Safety documentation, laboratory procedure, cross-team communication, technical event planning, and design review.</p></div></section>
    </div>
    ${footer}`,

  experience: `
    ${sharedNav}
    ${pageHeader("Experience", "Engineering in research and industry", "Roles spanning machine learning research, assistive robotics, electrical design, medical imaging, rover electronics, and technical community leadership.")}
    <div class="experience-list">
      ${experience("00", "Future Engineering Intern at Your Company", "Your Company · Anywhere", "Available May 2027", ["Available for a Summer 2027 engineering internship or co-op beginning in May.", "Ready to contribute across embedded systems, PCB design, robotics, test engineering, FPGA development, or engineering-focused machine learning applications.", "Brings hands-on experience taking ideas from schematic and code through integration, testing, debugging, and clear technical documentation.", "Your company logo will be displayed here!"], ["Available May 2027", "Embedded Systems", "Hardware", "Robotics", "FPGA", "AI"], [{type: "placeholder", text: "Image loading indefinitely..."}])}
      ${experience("01", "AI Software Engineering Student", "Hammond Power Solutions · Guelph, ON", "Jan 2026 — Sep 2026", ["Developed Python AI tools that accelerated electrical-transformer design and supported production engineering workflows.", "Trained an FT-Transformer in PyTorch and built FAISS similarity search around transformer attributes for product matching.", "Created Azure OpenAI and Microsoft AI Foundry agents that retrieve, interpret, and summarize engineering data for users.", "Maintained authenticated Azure web applications, implemented SQL activity logging, and learned transformer theory, design constraints, and practical applications."], ["Python", "PyTorch", "FAISS", "Azure OpenAI", "AI Foundry", "SQL"])}
      ${experience("02", "IoT Developer, Biomedical Robotics Applications", "Robotics Institute: Rehabilitation and Assistive Robotics Devices · Guelph, ON", "Sep 2025 — Present", ["Maintained an ESP32-based wireless control system and developed a React Native application for real-time BLE control of assistive hardware.", "Tested Android and iOS deployments, used Xcode for device builds, and traced BLE data flow between the mobile interface and embedded controller.", "Researched and prototyped ESP32 IoT-board concepts while programming microcontrollers and integrating sensors.", "Verified soldered electronic assemblies and troubleshot AC-powered automation equipment by reviewing datasheets and following laboratory electrical-safety procedures."], ["ESP32", "React Native", "BLE", "iOS", "Android", "Embedded Systems", "Lab Testing"])}
      ${experience("03", "Vice President Safety & Electrical/Software Team Member", "University of Guelph Robotics Team · Guelph, ON", "Sep 2023 — Present", ["Designed rover electrical systems including emergency stops, wiring harnesses, sensor interfaces, and motor-control PCBs.", "Created electrical schematics and a detailed safety report documenting the rover’s electrical architecture and safety features for compliance with Canadian International Rover Challenge requirements.", "Programmed microcontrollers and camera setups with C++ and Python.", "Collaborated across four mechanical, electrical, software, and autonomy sub-teams to resolve interface, design, safety, and logistics problems.", "Assembled, soldered, tested, and debugged rover hardware using oscilloscopes, multimeters, soldering equipment, datasheets, and structured lab procedures.", "Led lab-safety practices as VP Safety, balancing technical development with risk reviews, documentation, and safe team operations."], ["PCB Design", "ROS2", "C++", "AutoCAD", "Sensors", "Electrical Safety", "Team Leadership"])}
      ${experience("04", "Machine Learning For Medical Image Analysis Research Assistant", "AI-Enabled Medical Image Analysis Lab · University of Guelph", "May 2025 — Aug 2025", ["Independently developed an intracranial-hemorrhage detection and multi-label classification pipeline using 42,000 RSNA DICOM images.", "Built a TensorFlow/Keras ensemble using ResNet-50, EfficientNet-B3, DenseNet-121, an LSTM using image metadata, and an XGBoost meta-classifier.", "Reformatted datasets and produced analysis with Pandas, NumPy, and Matplotlib; evaluated results with AUC and F1 metrics, reaching a 0.93 F1 score for the “Any” hemorrhage class.", "Explored PyTorch and Hugging Face Vision Transformer models while strengthening the mathematical and statistical foundations behind medical computer vision."], ["TensorFlow", "Keras", "CNN", "LSTM", "XGBoost", "DICOM", "PyTorch"])}
      ${experience("05", "Hardware Lead & Membership Development Coordinator", "IEEE Student Branch · University of Guelph", "Feb 2025 — Present", ["Plan and deliver hands-on technical events that teach electronics fundamentals through breadboard circuits and guided hardware activities.", "Designed a workshop car chassis and camera gimbal in SolidWorks, then integrated the electronics and software required for interactive demonstrations.", "Coordinate event hardware, technical instruction, and member outreach while supporting students with different levels of electronics experience."], ["SolidWorks", "Electronics", "Technical Education", "Event Planning", "Leadership"])}
    </div>
    ${footer}`,

  projects: `
    ${sharedNav}
    ${pageHeader("Engineering Projects", "Designed, built, and tested", "Selected hardware and software projects covering PCB design, embedded control, digital logic, robotics, and mechanical systems.")}
    <div class="project-page-grid">
      ${project("01 / EMBEDDED", "ESP32 Mini Drone", "August 2026", "Designing a compact RC quadcopter based on Max Imagination's design, using a XIAO ESP32S3, four micro motors, and a custom motor-drive board. The PCB combines the motor drivers and gyroscope in one board, used ESP-FC firmware and ELRS provide flight control and radio communication.", ["XIAO ESP32S3", "PCB Design", "Fusion 360", "ESP-FC", "ELRS"], [{src: "images/drone/drone-print.png", alt: "Two ESP32 mini-drone chassis frames prepared in Bambu Studio", caption: "Two chassis frames arranged for 3D printing in Bambu Studio."}, {src: "images/drone/drone-cad.png", alt: "Fusion 360 CAD model of the mini-drone chassis", caption: "Fusion 360 chassis model with protected motor mounts and a central electronics bay."}, {src: "images/drone/drone-built.jpg", alt: "Assembled mini drone with four motors, propellers, and camera", caption: "Current assembled drone prototype."}], ["Modeled the protective chassis and electronics mounts in Fusion 360, then prepared and printed multiple frame iterations.", "Developed a PCB for motor drive, sensing, power distribution, and the XIAO ESP32S3 controller.", "Soldered all components and tested electronics, troubleshot issues that arose."])}
      ${project("02 / PCB", "STM32G0 CAN-FD Arm-Motor Drive Board", "October 2025", "Designed and soldered a four-layer arm-control PCB around the STM32G0B1CET6 to provide a compact interface between the rover controller, Dynamixel actuators, and ODrive motor controllers.", ["STM32G0B1", "CAN-FD", "RS485", "KiCad", "Buck Converter", "LDO", "PCB Assembly"], [{src: "images/projects/armboard.png", alt: "KiCad 3D render of the STM32G0 CAN-FD arm-control PCB", caption: "Arm Control Board V2.0 showing the STM32, CAN-FD and RS485 interfaces, power stages, programming header, and rover-bus connections."}], ["Integrated CAN transceiver circuitry for ODrive and rover-bus communication, plus a MAX485 interface that converts STM32 UART signals to RS485 for Dynamixel motors.", "Designed the on-board power tree with a 12 V-to-5 V buck converter followed by a 5 V-to-3.3 V LDO to supply the controller and communication electronics.", "Routed the high-current input, protected power connections, SWD programming interface, and control buses across a four-layer stack in KiCad.", "Board made in collaboration with fellow UGRT memebers, image contains names of all who contributed."])}
      ${project("04 / EMBEDDED", "Raspberry Pi Digital Voltmeter", "October 2025 &mdash; November 2025", "Built a complete embedded voltmeter in a four-person Microcomputer Interfacing lab team, using a Raspberry Pi 4, Waveshare Sense HAT, and ADS1015 ADC to sample an analog input over I2C and present the measurement on a transistor-driven three-digit seven-segment display.", ["Raspberry Pi 4", "C", "I2C", "ADS1015", "GPIO", "lgpio", "Oscilloscope", "Python"], [{src: "images/projects/voltmeter/assembled-circuit.png", alt: "Completed Raspberry Pi digital voltmeter breadboard circuit", caption: "Complete prototype integrating the Raspberry Pi, Waveshare Sense HAT, transistor and resistor network, and three-digit display."}, {src: "images/projects/voltmeter/schematic.png", alt: "Schematic for the transistor-switched three-digit seven-segment display", caption: "Active-low display schematic with current-limiting resistors and 2N2222 transistor digit drivers."}, {src: "images/projects/voltmeter/oscilloscope.png", alt: "Oscilloscope capture of the voltmeter test waveform", caption: "Oscilloscope validation of the function-generator square-wave input used to test the measurement path."}, {src: "images/projects/voltmeter/display.png", alt: "Three-digit seven-segment display operating with the Raspberry Pi voltmeter", caption: "Working multiplexed display driven by the Raspberry Pi GPIO interface."}], ["Developed and compiled C firmware with GCC and the lgpio library to configure the ADS1015, correct its byte order, convert ADC readings, and separate the result into three display digits.", "Implemented an active-low digit-decoding table and a multiplexed scan routine that rapidly selects each digit through 2N2222 transistor switches while driving the shared segments through current-limiting resistors.", "Validated the input with a function generator and oscilloscope, then extended the acquisition workflow to record samples in CSV format and visualize the captured signal with Python and Excel."])}
      ${project("03 / EMBEDDED", "Wi-Fi Controlled ESP32 RC Car", "", "Designed and built a browser-controlled four-motor RC platform around an ESP32-WROVER and TB6612FNG motor driver, combining embedded firmware, a real-time web interface, and a custom mechanical chassis.", ["ESP32-WROVER", "C++", "WebSocket", "JavaScript", "HTML", "TB6612FNG", "3D Printing"], [], ["Developed C++ firmware to translate browser commands into directional and speed control for four DC motors through the dual H-bridge driver.", "Created a JavaScript and HTML control interface using WebSocket communication for responsive, cable-free operation over Wi-Fi.", "Modeled and 3D printed the chassis to package the controller, motor driver, motors, battery, and wiring as a complete mobile system.", "Prepared the platform for camera integration and future object-detection experiments."])}
      ${project("04 / DIGITAL", "16-bit Single-Cycle CPU in VHDL", "March 2025 &mdash; April 2025", "Designed and verified a hierarchical 16-bit, single-cycle processor in VHDL using a Harvard architecture. The processor executes a custom 11-instruction subset of the MIPS ISA and reads 16-bit machine instructions from instruction memory.", ["VHDL", "Xilinx Vivado", "Harvard Architecture", "Digital Logic", "Test Benches"], [{src: "images/cpu/cpu-simulation.png", alt: "Vivado behavioral simulation of the completed 16-bit CPU", caption: "Completed CPU behavioral simulation, including register, memory, jump, and branch signals."}, {src: "images/cpu/cpu-simulation-continued.png", alt: "Continuation of the completed CPU behavioral simulation", caption: "Second simulation interval verifying the remaining instruction and control-signal sequence."}, {src: "images/cpu/alu-simulation.png", alt: "Vivado waveform testing the eight-bit ALU component", caption: "Structural and behavioral ALU verification across arithmetic and logic operations."}, {src: "images/cpu/datapath-schematic.png", alt: "Vivado elaborated datapath showing registers, control, sign extension, multiplexers, and ALU", caption: "An earlier datapath stage integrating the register file, control unit, sign extension, multiplexers, and ALU."}, {src: "images/cpu/newimgpt1diagram.png", alt: "Part 1 of the large CPU design diagram", caption: "CPU design diagram - part 1 of the full diagram."}, {src: "images/cpu/cpu-elaborated-design.png", alt: "Vivado elaborated design of the completed single-cycle CPU", caption: "Top-level elaborated CPU design showing the connected control, memory, register, ALU, and program-counter paths."}], ["Implemented arithmetic, comparison, memory, jump, and branch-not-equal instructions: ADD, ADDI, SUB, SUBI, OR, SLT, LW, SW, BNE, and jump.", "Integrated a program counter, separate instruction and data memories, a 16-register file, ALU, control unit, sign extender, adders, and multiplexers as reusable hierarchical components.", "Built waveform-based test benches to verify a 16-instruction program and diagnose control timing, register updates, memory access, and next-PC selection.", "Resolved a branch timing fault by moving zero detection to the top level and formed the three-way next-PC path from cascaded 2-to-1 multiplexers.", "Developed the processor incrementally from a structural ALU and register/control datapath, then integrated memory and jump/branch control into the final single-cycle architecture."])}
      ${project("05 / ROBOTICS", "Automated 3-Axis Robot Arm", "", "Developed a three-axis servo robot arm that supports both live operator input and repeatable automated motion, then extended the project into a ROS2 and Gazebo robotics workflow.", ["Arduino", "C++", "ROS2", "Gazebo", "Servo Control", "Potentiometers"], [], ["Programmed Arduino C++ control for three servo joints using potentiometers as direct human inputs.", "Implemented repeatable motion routines so the arm could replay predefined joint sequences in addition to manual control.", "Migrated joint commands into ROS2 topics to separate input, control, and actuation responsibilities.", "Used Gazebo to model and test planned arm motions before applying the robotics-control approach to physical hardware."])}
      ${project("06 / PCB", "STM32 NUCLEO Multi-Motor Drive Board", "March 2025", "Designed and soldered a compact four-layer, through-hole PCB that organizes the connections between an STM32 NUCLEO-F767ZI and multiple rover motion controllers, sensors, and encoder interfaces.", ["NUCLEO-F767ZI", "UART", "I2C", "CAN", "JST-XH", "KiCad", "Through-Hole Assembly"], [{src: "images/projects/driveboard.png", alt: "KiCad 3D render of the STM32 NUCLEO multi-motor drive board", caption: "Multi-motor interface board with NUCLEO headers, UART, I2C, CAN, turret, and encoder connections."}], ["Broke out STM32 communication and control pins into clearly labeled JST-XH and through-hole connections for easier rover wiring, assembly, and servicing.", "Routed UART and I2C buses alongside CAN, turret, and five encoder interfaces while retaining access to the NUCLEO headers.", "Organized a large number of signals into a small board area and added mounting points and silkscreen labels to simplify installation and troubleshooting.", "Board made in collaboration with UGRT members."])}
      ${project("07 / CAD", "Reverse-Engineered SolidWorks Assembly", "January 2025 &mdash; April 2025", "Led a four-person team in reverse engineering and digitally replicating a solar-powered ostrich model. Measured physical components with calipers and precision tools, modeled the parts, and produced detailed 2D technical drawings.", ["SolidWorks", "Precision Measurement", "Technical Drawings", "Assembly Design"], [{type: "video", src: "images/reverse-engg/VideoProject%20(1).mp4", alt: "Animated exploded view of the reverse-engineered SolidWorks assembly", caption: "Animated exploded view of the completed 69-unique-part, 138-total-part assembly."}, {type: "placeholder", number: 2}, {type: "placeholder", number: 3}], ["Built a functional digital assembly containing 69 unique components and 138 total parts.", "Created an exploded-view animation to communicate assembly structure, component relationships, and construction order."])}
      ${project("08 / SOFTWARE", "Object-Oriented Java Game", "", "Built a desktop game in a five-person team across three development phases, applying object-oriented Java design while creating the complete graphical interface with Swing and AWT.", ["Java", "Swing", "AWT", "Object-Oriented Design", "GitHub"], [], ["Structured game state, interface behavior, and reusable functionality into maintainable Java classes using object-oriented design principles.", "Developed the interface from scratch with Swing and AWT, connecting user input and visual components to the underlying game logic.", "Used GitHub for version control and team collaboration, coordinating changes and integrating work across successive project phases."])}
    </div>
    ${footer}`,

  contact: `
    ${sharedNav}
    ${pageHeader("Contact", "Let's build something physical", "I am interested in embedded systems, electrical design, robotics, and AI opportunities.")}
    <div class="contact-layout">
      <section class="contact-actions">
        <a href="mailto:hariszub0@gmail.com"><span aria-hidden="true">✉</span><span><b>Personal Email</b><small>hariszub0@gmail.com</small></span></a>
        <a href="mailto:hzubair@uoguelph.ca"><span aria-hidden="true">@</span><span><b>School Email</b><small>hzubair@uoguelph.ca</small></span></a>
        <a href="https://www.linkedin.com/in/haris-zubair-uofg" target="_blank" rel="noreferrer"><span aria-hidden="true">in</span><span><b>LinkedIn</b><small>Haris-Zubair-UofG</small></span></a>
        <a href="default res.pdf" download><span aria-hidden="true">↓</span><span><b>Résumé</b><small>Download PDF</small></span></a>
      </section>
      <aside class="availability-panel portfolio-panel">
        <div class="panel-title">Availability</div>
        <div class="panel-content"><p class="availability"><span aria-hidden="true"></span> Open to engineering opportunities</p><p>Based in Ontario. Expected graduation: May 2028.</p><p>Primary interests:</p><ul><li>Embedded systems and firmware</li><li>PCB and electrical design</li><li>Robotics and automation</li><li>Engineering AI applications</li></ul></div>
      </aside>
    </div>
    ${footer}`
};

function initializeMediaGalleries() {
  const galleries = [...document.querySelectorAll("[data-slideshow]")];

  function showSlide(gallery, nextIndex) {
    const slides = [...gallery.querySelectorAll(".media-slide")];
    if (!slides.length) return;
    const index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== index;
      slide.classList.toggle("active", slideIndex === index);
      if (slideIndex !== index) slide.querySelector("video")?.pause();
    });
    gallery.dataset.activeSlide = index;
    gallery.querySelector(".slide-count").textContent = `${index + 1} / ${slides.length}`;
  }

  galleries.forEach((gallery) => {
    gallery.dataset.activeSlide = "0";
    gallery.querySelector("[data-slide-prev]")?.addEventListener("click", () => showSlide(gallery, Number(gallery.dataset.activeSlide) - 1));
    gallery.querySelector("[data-slide-next]")?.addEventListener("click", () => showSlide(gallery, Number(gallery.dataset.activeSlide) + 1));
  });

  const lightbox = document.createElement("dialog");
  lightbox.className = "media-lightbox";
  lightbox.setAttribute("aria-label", "Expanded media viewer");
  lightbox.innerHTML = `
    <div class="lightbox-window">
      <header class="lightbox-title"><span>Media Viewer</span><button type="button" data-lightbox-close aria-label="Close expanded media">×</button></header>
      <div class="lightbox-stage"></div>
      <footer class="lightbox-controls"><button class="win-button" type="button" data-lightbox-prev>&larr; Previous</button><span class="lightbox-count"></span><button class="win-button" type="button" data-lightbox-next>Next &rarr;</button></footer>
    </div>`;
  document.body.append(lightbox);

  let activeGallery = null;
  let activeIndex = 0;

  function renderExpanded(index) {
    if (!activeGallery) return;
    const expandableSlides = [...activeGallery.querySelectorAll(".media-slide:has([data-expand-media])")];
    if (!expandableSlides.length) return;
    activeIndex = (index + expandableSlides.length) % expandableSlides.length;
    const sourceSlide = expandableSlides[activeIndex];
    const stage = lightbox.querySelector(".lightbox-stage");
    stage.replaceChildren();
    const sourceImage = sourceSlide.querySelector("img");
    const sourceVideo = sourceSlide.querySelector("video");
    const caption = sourceSlide.querySelector("figcaption")?.textContent || "";
    if (sourceImage) {
      const image = document.createElement("img");
      image.src = sourceImage.src;
      image.alt = sourceImage.alt;
      stage.append(image);
    } else if (sourceVideo) {
      const video = document.createElement("video");
      video.src = sourceVideo.currentSrc || sourceVideo.querySelector("source")?.src;
      video.controls = true;
      video.autoplay = false;
      stage.append(video);
    }
    if (caption) {
      const text = document.createElement("p");
      text.textContent = caption;
      stage.append(text);
    }
    lightbox.querySelector(".lightbox-count").textContent = `${activeIndex + 1} / ${expandableSlides.length}`;
  }

  document.querySelectorAll("[data-expand-media]").forEach((button) => {
    button.addEventListener("click", () => {
      activeGallery = button.closest("[data-slideshow]");
      const allExpandable = [...activeGallery.querySelectorAll(".media-slide:has([data-expand-media])")];
      const selectedSlide = button.closest(".media-slide");
      renderExpanded(allExpandable.indexOf(selectedSlide));
      lightbox.showModal();
    });
  });

  lightbox.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
  lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => renderExpanded(activeIndex - 1));
  lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => renderExpanded(activeIndex + 1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener("close", () => lightbox.querySelector("video")?.pause());
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") renderExpanded(activeIndex - 1);
    if (event.key === "ArrowRight") renderExpanded(activeIndex + 1);
  });
}

const currentPage = document.body.dataset.page || "home";
const portfolioRoot = document.querySelector("#portfolio-root");
const pageTitles = { home: "Engineering Portfolio" };

if (portfolioRoot && pages[currentPage]) {
  portfolioRoot.innerHTML = pages[currentPage];
  if (currentPage === "projects") {
    const projectGrid = document.querySelector(".project-page-grid");
    const desiredProjectOrder = [
      "ESP32 Mini Drone",
      "16-bit Single-Cycle CPU in VHDL",
      "STM32G0 CAN-FD Arm-Motor Drive Board",
      "Raspberry Pi Digital Voltmeter",
      "Automated 3-Axis Robot Arm",
      "STM32 NUCLEO Multi-Motor Drive Board",
      "Reverse-Engineered SolidWorks Assembly",
      "Wi-Fi Controlled ESP32 RC Car",
      "Object-Oriented Java Game"
    ];
    const projectCards = [...projectGrid.querySelectorAll(".project-detail")];
    desiredProjectOrder.forEach((title) => {
      const card = projectCards.find((item) => item.querySelector("h2")?.textContent === title);
      if (card) projectGrid.append(card);
    });
    document.querySelectorAll(".project-detail").forEach((card, index) => {
      if (!card.querySelector(".project-media")) {
        const copy = document.createElement("div");
        copy.className = "project-copy";
        while (card.firstChild) copy.append(card.firstChild);
        const media = document.createElement("div");
        media.className = "project-media";
        media.innerHTML = mediaSlideshow([], `${card.querySelector("h2")?.textContent || "Project"} media`);
        card.append(media, copy);
      }
      const label = card.querySelector(".project-number");
      const category = label.textContent.split("/")[1]?.trim() || "PROJECT";
      label.textContent = `${String(index + 1).padStart(2, "0")} / ${category}`;
    });
  }
  initializeMediaGalleries();
  document.querySelector(`[data-page-link="${currentPage}"]`)?.classList.add("active");
  document.querySelector("#address").value = `portfolio://${currentPage}`;
  const pageTitle = pageTitles[currentPage] || currentPage[0].toUpperCase() + currentPage.slice(1);
  document.querySelector("#window-title").textContent = `${pageTitle} - Internet Explorer`;
}
