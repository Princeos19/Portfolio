import { ProjectCard } from './ProjectCard';

const featuredItems = [
  {
    id: 'salonplus',
    title: 'SalonPlus',
    description: 'Salon App Case Study',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXtRwDt86y99QUsPSUVxYnD6ne2IZeaJGn4CtRTsmca0YWt6_kcQN10Ji2OFYfkdBOfrSBzf98Xf7Rg_M-acsS-WSoo9_fwYydtMAdezlWD1WRRcQpE_YGHTf-AA2m_8hG2e6f_Evlp51ZkaAWF0fdtRjYFL4RrEdnSIgpL8egfJcgkk9KHgD7JoBGIDSah40pQMZsERf4f49k476w_RlUmsjXCf2lJkw9fa-xmcB9zkPMPmzee0MvP7-AJl4mL_FeMMwF4q8FCtU',
  },
  {
    id: 'mindfit',
    title: 'MindFit',
    description: 'Mental Health and wellness app',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsh4yX7s16EcwfsUWB9-zi0XvOB6hq8XBr8WZJByIq6cfMRk2aROcBBkjyomBc1sIcCACH5dGSbhS90Xb6kUviql5hMYO7y3AB1dOLtr8XZ3m4l7WqgmREJwvIAoJ1GQoC2FTrcxp5Lqgtk3ybgIhW5LWCHYptbpJnYnRkaLc0emxRUHW3zp1RafDdFkgdkesxHkC0hfv9bF35cisRYGfM_kkp1rrB8aHWmHdol_4OmsFXmWl0sKQhYumqmGaQSNITvqkaqurc_XA',
  },
  {
    id: 'mummystar',
    title: "Mummy's Star",
    description: 'Ecommerce Platform',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIK4R7tPr5PfMjZGMhlrHOgEkKrs232Qtms7kk43m629fvWXL5-Unc8UWx5WDspK3msq9NUsaqmB47xRtECGuGTSk11pTvHF0kVkXnIbRaBjVLOHEZ3cvZprQqjkr_Ycw8vnQYGfWj6Uqd_SVkonUtMwsSbWfrC8YW4nxWUdusoFqgdyr9qQpMhxpwD4NRcXHWSIMxPWxPyvouGgMpDn3QtbYjD4t85NkOsfpEnHX2D7uwi0nWWS77JQ5NAxQKuFTJ0kBzigZGxvI',
  },
];

export function FeaturedProjects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {featuredItems.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
