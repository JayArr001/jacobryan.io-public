import ContactWidget from "../components/ContactWidget";
import ContinueExploringWidget from "../components/ContinueExploringWidget";
import {NavLink} from 'react-router-dom'

const ResumePage = () => {
  return (
    <div className="pb-12">
      <div className="px-8 pt-8 pb-4 flex flex-col items-center gap-8 max-w-[80ch] mx-auto relative">

        <header className="text-3xl font-bold">Career objective</header>
        <div className="w-full">
          <p className="w-full">
            &emsp;I am a young professional growing in the software engineering industry. Ready to leverage critical
            thinking and out-of-the-box problem-solving skills in a technical environment. Looking to apply years of
            hands-on experience with programming to solve complex challenges, work collaboratively, and contribute
            to meaningful, high-impact results.</p>
        </div>

        <hr className="min-w-[170px] w-[80%]"/>

        <header className="text-3xl font-bold">My tech stack</header>
        <div className="">
          <span className="font-bold">Programming Languages: </span>
          Java, JavaScript, C#, VBA, SQL, C, Python, C++, Assembly (MIPS, PowerPC).
          <br/>
          <span className="font-bold">Frontend frameworks: </span>
          ReactJS, TailwindCSS, JavaFX
          <br/>
          <span className="font-bold">Backend frameworks: </span>
          Spring Boot
          <br/>
          <span className="font-bold">Database: </span>
          MySQL, PostgreSQL
          <br/>
          <span className="font-bold">Tools: </span>
          IntelliJ, Eclipse, VSCode, Maven, JUnit, Confluence, Docker, Git, Slack, MS Teams, MS Office Suite
          <br/>
        </div>

        <hr className="min-w-[170px] w-[80%]"/>

        <header className="text-3xl font-bold">Key Engineering Challenges</header>
        <div>
          <p>
            &emsp;Three complex problems that pushed my engineering thinking and problem-solving skills. 
            Each highlights how I approached ambiguity, worked through edge cases, and improved as a developer; 
            and were just one task inside of entire projects. Full write-ups are linked for deeper detail.
          </p>
          <br/>
          <div className="pb-10">
            <div className="bg-white border border-amber-400 p-4 rounded-xl shadow-2xl shadow-amber-400 drop-shadow-xl/25 drop-shadow-yellow-400">
              <span className="font-bold">OAuth2.0 + CSRF implementation</span> <br/>
              <span className="font-bold">Project: </span> jacobryan.io<br/>
              <span className="italic">Designed and implemented a secure authentication flow using OAuth2 with session-based 
                authentication and CSRF protection, requiring coordination between frontend state, backend security configuration, 
                and browser cookie behavior.</span> <br/>
              <NavLink to={'/blog/3'} className="underline hover:text-shadow-lg">Read more →</NavLink>
              <br/>
              <br/>

              <span className="font-bold">Offline sync conflict resolution</span> <br/>
              <span className="font-bold">Project: </span> BookKeeper<br/>
              <span className="italic">Resolved asynchronous data-loading and state challenges from offline states by crafting a 
                merged/delta CRDT system to ensure consistent records and consolidating to one source of truth.</span> <br/>
              <NavLink to={'/blog/2'} className="underline hover:text-shadow-lg">Read more →</NavLink>
              <br/>
              <br/>

              <span className="font-bold">The line of sight problem</span> <br/>
              <span className="font-bold">Project: </span> Hiyascape<br/>
              <span className="italic">Resolved a critical line-of-sight problem by deriving logical outcomes from pathfinding 
                calculations due to a lack of access to map data from the client being obfuscated and unavailable.</span> <br/>
              <NavLink to={'/blog/1'} className="underline hover:text-shadow-lg">Read more →</NavLink>
            </div>
          </div>
        </div>

        <hr className="min-w-[170px] w-[80%]"/>

        <header className="text-3xl font-bold">Selected project history</header>
        <div className="pb-4">
          <p className="font-bold">jacobryan.io – Full-Stack Web Application</p>
          <span className="font-bold">Tech: </span>
          React, Tailwind CSS, Java, Spring Boot, PostgreSQL, OAuth2
          <br/>
          <span className="font-bold">Summary: </span>
          <span className="italic">Created a dynamic platform to showcase projects, technical skills, and written content</span>
          <br/>
          <br/>
          <ul className="[&>*]:list-disc [&>*]:mx-4 [&>*]:pl-2">
            <li className="">
              Designed a full-stack system to present 4 types of structured technical content 
              (projects, blog posts, guestbook, user data) through a unified interface via responsive design.
            </li>
            <li>
              Implemented OAuth2-based authentication and session management, 
              eliminating the need to store/secure 100% of user credentials.
            </li>
            <li>
              Architected 12 REST APIs to decouple frontend and backend concerns, enabling scalable content management and CRUD operations.
            </li>
            <li>
              Resolved asynchronous data-loading and state hydration challenges to ensure consistent UI rendering across navigation flows.
            </li>
            <li>
              Developed a reusable component architecture across 21+ shared components, centralizing state management and 
              improving maintainability and scalability.
            </li>
            <li>
              Built and deployed a blog and guestbook system supporting dynamic Markdown-based content publishing.
            </li>
          </ul>
        </div>

        <div className="pb-4">
          <p className="font-bold">BookKeeper - Business desktop application</p>
          <span className="font-bold">Tech: </span>
          Java, JavaFX, PostgreSQL
          <br/>
          <span className="font-bold">Summary: </span>
          <span className="italic">Built a custom desktop application to handle work ticketing and book-keeping, tailored to the client's exact needs</span>
          <br/>
          <br/>
          <ul className="[&>*]:list-disc [&>*]:mx-4 [&>*]:pl-2">
            <li>
              Developed a desktop application to manage work records, replacing legacy workflows with a structured system designed 
              for data accuracy and reliability during concurrent, high-impact usage.
            </li>
            <li>
              Implemented offline-first functionality supporting multiple user states (online, offline, reconnect) without data loss, 
              enabling continued operation in unreliable network conditions.
            </li>
            <li>
              Designed and resolved data synchronization across 4+ distributed data sources (local devices and cloud), ensuring a consistent source of truth during concurrent updates.
            </li>
            <li>
              Built and maintained 5 REST API endpoints to support CRUD operations and reliable data synchronization between client and server.
            </li>
          </ul>
        </div>

        <div className="pb-4">
          <p className="font-bold">Hiyascape - Online multiplayer video game client/server application</p>
          <span className="font-bold">Tech: </span>
          Java
          <br/>
          <span className="font-bold">Summary: </span>
          <span className="italic">Developed and hosted an online multiplayer video game with reverse-engineered client-server model</span>
          <br/>
          <br/>
          <ul className="[&>*]:list-disc [&>*]:mx-4 [&>*]:pl-2">
            <li>
              Engineered multiple in-game systems to function in a real-time asynchronous multiplayer environment 
              supporting more than 50 concurrent player interactions.
            </li>
            <li>
              Resolved a critical line-of-sight issue by implementing a server-authoritative visibility system, 
              eliminating reliance on client-side data.
            </li>
            <li>
              Developed features managing multi-entity state (player, world, server) across both online and offline scenarios.
            </li>
            <li>
              Designed solutions to technical limitations, enabling scalable expansion of in-game content systems.
            </li>
          </ul>
        </div>

        <div className="pb-4">
          <p className="font-bold">Compliance Analyst - Macros</p>
          <span className="font-bold">Tech: </span>
          VBA
          <br/>
          <span className="font-bold">Summary: </span>
          <span className="italic">Built and maintained several macros for Excel for task automation</span>
          <br/>
          <br/>
          <ul className="[&>*]:list-disc [&>*]:mx-4 [&>*]:pl-2">
            <li>
              Developed, tested and implemented internal tools to automate numerous tasks, saving as much
              as 240 hours per week of personnel-time across the entire team.
            </li>
            <li>
              Work with team leads and other team members closely to gather user-stories and implement
              them into critical features in the above automation.
            </li>
            <li>
              Run SQL queries to compile and analyze data about customers and ensure financial regulatory
              compliance in a fintech company.
            </li>
          </ul>
        </div>

        <hr className="min-w-[170px] w-[80%]"/>

        <header className="text-3xl font-bold">Education</header>
        <div className="pb-4 w-full">
          <p className="font-bold">BS Business & Entrepreneurship</p>
          <p>W.P Carey School of Business, Arizona State University, Tempe AZ</p>
          <p>May 2019</p>
          <br/>
          <p>&emsp;Coursework includes management, finance, entrepreneurship & value creation, supply chain, marketing, 
            negotiations, business model development and human resource management</p>
          <p className="italic">&emsp;Additional coursework: Completed multiple electives in Computer Science including classes 
            such as AI/ML, Data Structures & Algorithms, and Logic in Computer Science</p>
        </div>
        
        <hr className="min-w-[170px] w-[80%]"/>
        <h2 className="text-2xl text-center font-semibold">Get in touch</h2>
        <ContactWidget center={false}/>
        <hr className="min-w-[170px] w-[80%]"/>
        <div className = "py-4 px-8">
          <ContinueExploringWidget/>
        </div>
      </div>
    </div>
  )
}

export default ResumePage
