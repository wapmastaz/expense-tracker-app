import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {Bell, ChevronLeft, LogOutIcon} from "lucide-react";
import {Image} from "@unpic/react";
import {Item, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Badge} from "@/components/ui/badge";
import {useUserProfile} from "@/hooks/useUserProfile.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useState} from "react";
import {logUserOut} from "@/services/user-service.ts";
import {toast} from "sonner";
import useAuthStore from "@/store/auth-store.ts";

export const Route = createFileRoute('/_authenticated/profile')({
 component: ProfilePage,
})

interface ProfileMenuProps {
  id: number;
  name: string;
  icon: string;
  url?: string;
}

const profileMenu: ProfileMenuProps[] = [
  {
    id: 1,
    name: "Account info",
    icon: "./profile-icons/user.png",
    url: "/profile",
  },
  {
    id: 2,
    name: "Personal profile",
    icon: "./profile-icons/profile.png",
    url: "/profile",
  },
  {
    id: 3,
    name: "Message center",
    icon: "./profile-icons/envelope.png",
    url: "/profile",
  },
  {
    id: 4,
    name: "Login and security",
    icon: "./profile-icons/shield.png",
    url: "/profile",
  },
  {
    id: 5,
    name: "Data and privacy",
    icon: "./profile-icons/privacy.png",
    url: "/profile",
  }
]

function ProfilePage() {

  const {data: user, isLoading} = useUserProfile()
  const [loading, setLoading] = useState<boolean>(false)

  const {clearToken} = useAuthStore((state) => state)
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      setLoading(true)
      const {message} = await logUserOut()
      clearToken()
      toast.success(message)
      navigate({
        to: "/login",
        from: "/profile"
      })
    }catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header
        className="bg-primary h-60 flex
      items-center
      ">
        <div className="container">
          <div className="flex justify-between items-center">
            <Button
              size="icon-lg"
              className="text-background w-10 h-10"
              asChild
            >

              <Link to="/">
                <ChevronLeft/>
              </Link>
            </Button>

            <h3 className="text-lg text-background font-semibold">
              Profile
            </h3>

            <Link
              to="/profile"
              className="text-background
          flex items-center justify-center
          bg-[#3F8C87]
          rounded relative
           w-10 h-10"
            >
              <Bell size={25}/>
              <Badge
                className="w-2 h-2 p-0 bg-[#FFAB7B] top-2.5 right-2.5 flex absolute rounded-full"
                variant="destructive"></Badge>
            </Link>

          </div>
        </div>
      </header>

      <section className="relative -top-16">
        <div className="container">
          {/*  avatar icon*/}
          <div
            className="flex
            w-30 h-30
            mx-auto
            rounded-full
            bg-background
            items-center
            justify-center
            shadow-xl
            overflow-hidden
            mb-4
            ">
            <Image
              src="./profile.png"
              width={100}
              height={100}
              alt="profile image"
              className="h-full w-full mt-2"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Spinner/>
            </div>
          ) : (
            <div
              className="flex flex-col
            gap-1
            items-center
            mb-6
            "
            >
              <h4
                className="
              font-semibold
              text-xl
              text-gray-800
              "
              >
                {user?.username}
              </h4>
              <p
                className="font-semibold text-sm text-primary"
              >
                {user?.email}
              </p>
            </div>
          )}


          {/*  profile menu*/}
          <div className="flex mb-6 w-full max-w-lg flex-col">
            <Link to="/profile">
              <Item variant="default">
                <ItemMedia
                  className="rounded-full bg-[#F0F6F5] w-12.5 h-12.5 flex items-center justify-center">
                  <Image
                    src="./profile-icons/diamond.png"
                    width={33}
                    height={27}
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-base font-medium">
                    Invite Friends
                  </ItemTitle>
                </ItemContent>
              </Item>
            </Link>
            <Separator/>
            {profileMenu.map(({id, name, icon, url}) => (
              <Link to={url} key={id}>
                <Item variant="default"
                      className="hover:bg-gray-100">
                  <ItemMedia>
                    <Image
                      src={icon}
                      width={33}
                      height={27}
                      alt={`${name} ${icon}`}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-base font-medium">
                      {name}
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Button disabled={loading}
                    onClick={logOut}
                    className="flex gap-1"
                    variant="destructive">
              <LogOutIcon/>
              Logout
            </Button>
          </div>
        </div>

      </section>
    </>

  )
}
