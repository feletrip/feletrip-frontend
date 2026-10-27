import { Button } from "@/components/ui/button"
import { User } from "@/types/user"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { FaEdit } from "react-icons/fa"

type Props = {
    user: User
    onEdit: () => void
}


export default function ProfileView({ user, onEdit }: Props) {
    const {data: session} = useSession();
    const userInfo = session?.user

    return (
        <div className="bg-card rounded-xl border p-8 shadow-sm">
            <div className="flex items-center gap-6">
 

                <Image
                    src={userInfo?.avatar || "/avatar.png"}
                    alt={userInfo?.name || "UserName"}
                    width={50}
                    height={30}
                    className="w-20 h-20 rounded-full object-cover border"
                />

                <div>
                    <h2 className="text-2xl font-semibold">{userInfo?.name}</h2>
                    <p className="text-muted-foreground">{userInfo?.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 text-sm">

                <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{userInfo?.phone || "Not Given"}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Role</p>
                    <p className="font-medium capitalize">{userInfo?.role || "Not Given"}</p>
                </div>

                <div>
                    <p className="text-muted-foreground">Verification</p>
                    <p className="font-medium">
                        {user.isVerified ? "Verified" : "Not Verified"}
                    </p>
                </div>

            </div>

            <div className="mt-8">
                <Button onClick={onEdit}>Edit Profile <FaEdit /></Button>
                <div className="mt-3">
                    <p>
                        From edit option you can add your NID and Trade License.
                    </p>
                </div>
            </div>
        </div>
    )
}