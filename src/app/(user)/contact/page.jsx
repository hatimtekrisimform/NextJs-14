import Image from "next/image";
import styles from "./contact.module.css";
import { addMessage } from "../../../lib/action";

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR/> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <form action={addMessage} className={styles.form}>
          <input type="text" placeholder="Name and Surname" name="name" />
          <input type="text" placeholder="Email Address" name="email" />
          <input
            type="text"
            placeholder="Phone Number (Optional)"
            name="mobile"
          />
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
            name="message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
