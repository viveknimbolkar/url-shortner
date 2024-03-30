// get desired path endpoint
export default function path(user, to, link_id = "") {
  if (!user || !to) return;
  if (to === "LINK" && !link_id) return;

  const paths = {
    HOME: "/",
    DASHBOARD: `/user/${user?.sub}`,
    LOGIN: "/login",
    SIGNUP: "/signup",
    MY_LINKS: `/user/${user?.sub}/links`,
    LINK: `/user/${user?.sub}/link/${link_id}`,
    PROFILE: `/user/${user?.sub}/profile`,
  };
  return paths[to];
}
