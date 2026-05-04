import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const BlogSidebar = ({setOpen, onMobile = true}) => {
  const [postsByDate, setPostsByDate] = useState({});

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach(post => {
          const date = new Date(post.dateCreated);
          const year = date.getFullYear();
          const month = date.toLocaleString('default', { month: 'long' });

          grouped[year] = grouped[year] || {};
          grouped[year][month] = grouped[year][month] || [];
          grouped[year][month].push(post);
        });

        //sort posts descending
        Object.values(grouped).forEach(months => {
          Object.values(months).forEach(posts => {
            posts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
          });
        });

        setPostsByDate(grouped);
      });
  }, []);

  const monthOrder = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
  };

  //find the current year and month name
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.toLocaleString('default', { month: 'long' });
  const linkStyling = ({isActive}) => isActive ? 'max-w-[20ch] hover:text-shadow-xl border-l-4 border-blue-400 ' :
      'underline hover:text-shadow-lg max-w-[25ch] text-blue-500';

  return (
    <aside className = "py-6 max-lg:ml-[10%]">
      <h2 className="text-2xl font-semibold mb-4">Blog Archive</h2>

      {Object.entries(postsByDate)
        .sort(([yearA], [yearB]) => yearB - yearA) //years descending
        .map(([year, months]) => (
          <details key={year} open={parseInt(year) === currentYear} className="pb-2">
            <summary className="font-bold text-xl">{year}</summary>
            <ul className="ml-4 max-lg:py-4 max-lg:text-xl pt-2 space-y-2">
              {Object.entries(months)
                .sort(([monthA], [monthB]) => monthOrder[monthB] - monthOrder[monthA]) //months descending
                .map(([month, posts]) => (
                  <details
                    key={month}
                    open={parseInt(year) === currentYear && month === currentMonth}
                  >
                    <summary className="font-medium max-lg:py-1">{month}</summary>
                    <ul className="ml-5 space-y-2 max-lg:py-1 lg:py-2">
                      {posts.map(post => (
                        <li key={post.id} className = "max-lg:py-1">
                          <NavLink
                            className={linkStyling} to={`/blog/${post.id}`} onClick={() => {if(onMobile){setOpen(false)}}}
                          >
                            {({isActive}) => isActive ? `\u00A0${post.title}` : `\u2022\u00A0${post.title}`}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
            </ul>
          </details>
        ))}
    </aside>
  );
};

export default BlogSidebar;
