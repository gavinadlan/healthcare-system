import { auth } from "@clerck/nextjs/server";
import Image from "next/image";
import { Button } from "../components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl">
              Kinda HCS
            </span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            repellat autem reprehenderit tempora mollitia ullam incidunt
          </p>

          <div>
            {userId ? (
              <></>
            ) : (
              <>
                <link href="/sign-up">
                  <Button>New Patient</Button>
                </link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
