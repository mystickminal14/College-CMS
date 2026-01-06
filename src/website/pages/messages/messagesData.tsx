import pankaj from '../../../assets/core/jalan.webp'
import prakash from '../../../assets/core/prakash.webp'

import paramjeet from '../../../assets/core/drparam.webp'
import hockuan from '../../../assets/core/prof.webp'

export interface Message {
  id: number;
  name: string;
  position: string;
  institution: string;
  title: string;
  greeting: string;
  message: string;
  quote?: string;
  image: string;
  badge: string;
}

export const messagesData: Message[] = [
  {
    id: 1,
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group of Institutions",
    title: "Welcome Message",
    greeting: "Dear Students,",
    message: `It is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you are a part of a large and diverse group reflecting our wonderful regional character and diversity.

We are all wholeheartedly committed to and focused on our core mission: ensuring your academic success and giving you the best possible academic experience for your lifelong success.

Through the years of experience that we have garnered in the sector of academics and education, we have constantly and endlessly dedicated ourselves to providing quality education at an affordable cost and we are proud to state that our graduates are positioned today at the helm of the top ranked organizations, companies, business-houses of the country – be it in the field of Information Technology or Management.

With this pedigree, we strive to further enhance our journey towards reaching unprecedented levels of excellence in the years to come and pledge to leave no stone unturned in our effort to provide the congenial environment for aspiring students to excel in every sphere of a student's life.`,
    quote: "Come and be a part of academically simulating and invigorating experience with us.",
    image: pankaj,
    badge: "Official Message"
  },
  {
    id: 2,
    name: "Er. Prakash Kumar Kejriwal",
    position: "Executive Director",
    institution: "LBEF Group of Institutions",
    title: "Welcome to LBEF Campus",
    greeting: "Dear Prospective Students,",
    message: `Welcome to LBEF CAMPUS - the First IT College of Nepal

We are excited about your interest in joining our esteemed institution. At LBEF, we are dedicated to offering an exceptional educational experience that prepares you for success in the ever-evolving technological landscape. Our commitment to Outcome-Based Education (OBE) and Education 4.0 ensures that our curriculum is designed to meet the needs of the modern workforce.

At LBEF, our primary goal is to produce industry-ready graduates. Through a blend of theoretical knowledge and practical skills, we aim to equip you with the competencies required to excel in your chosen career paths. We are proud to strive for 100% employability for our graduates, and to achieve this, we have established our very own job board, EVOLVE. This platform connects our students with a plethora of career opportunities, ensuring a smooth transition from education to employment.

Choosing LBEF means choosing a future filled with possibilities. Our dedicated faculty, state-of-the-art facilities, and innovative teaching methods are here to support and guide you every step of the way.

We look forward to welcoming you to our vibrant community and embarking on this exciting journey together.`,
    quote: "Choosing LBEF means choosing a future filled with possibilities.",
    image: prakash,
    badge: "Executive Message"
  },
  {
    id: 3,
    name: "Datuk Param Jeet Singh",
    position: "Co-Founder & CEO",
    institution: "APIIT Education Group",
    title: "Welcome to APU-LBEF Partnership",
    greeting: "Dear Prospective Students,",
    message: `We welcome LBEF to the international community of the Asia Pacific University of Technology & Innovation (APU). Parents, prospective & current students will be pleased to note that over 11,000 students including international students from over 120 countries are currently studying at the APU campus based in Kuala Lumpur, Malaysia.

We are all well aware that education is an important catalyst in developing talented and skilled manpower, helping to transform a nation to compete in the global economy. Therefore the collaboration between LBEF and APU will aim to provide the best of Nepal and Malaysian education in producing qualified and employable professionals to fulfil the skilled manpower requirements of Nepal and the region.

To all prospective students, please take the opportunity to seek professional advice from LBEF or APU on undergraduate Bachelor's degree and post-graduate Masters degree programmes that suit your professional and career requirements.

I wish all students a productive journey towards their future careers and look forward to a fruitful collaboration with LBEF in the years to come.`,
    image: paramjeet,
    badge: "International Partnership"
  },
  {
    id: 4,
    name: "Prof. Dr. Ho Chin Kuan",
    position: "Vice Chancellor",
    institution: "Asia Pacific University of Technology and Innovation",
    title: "APU-LBEF Academic Partnership",
    greeting: "Dear Students,",
    message: `I would like to extend a warm welcome to students who are part of the APU – LBEF academic partnership. The APU – LBEF partnership which started in 2016 has produced around 300 graduates. Student centricity and uncompromising quality are at the heart of this partnership. At present, LBEF offers six academic programs leading to awards from APU. Graduates with an APU degree are creative thinkers and innovative problem solvers who command a competitive edge in the industry. Many alumni have gone on to be captains of the industry and made significant contributions to society. Students enrolled in an APU program at LBEF have opportunities to broaden their global outlook by participating in various mobility programs conducted at the APU campus in Malaysia.

I'm extremely proud of this partnership that has grown from strength to strength. I look forward to celebrating success with you – students, staff and friends at LBEF.`,
    image: hockuan,
    badge: "Academic Partnership"
  }
];

// Get all messages
export const getAllMessages = (): Message[] => messagesData;

// Get message by ID
export const getMessageById = (id: string | number): Message | undefined => {
  return messagesData.find(message => message.id === parseInt(id.toString()));
};

// Get message IDs for routing
export const getMessageIds = () => {
  return messagesData.map(message => ({
    params: { id: message.id.toString() }
  }));
};