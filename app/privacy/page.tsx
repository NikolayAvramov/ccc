"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-[4.5rem]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mt-1">Last updated: 2026</p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                1. Information We Collect
              </h2>
              <p>
                We collect personal information such as name, email, and user
                listings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Data</h2>
              <p>
                Data is used to operate the platform and improve user
                experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
              <p>
                We do not sell your data. Information is only shared when
                necessary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Security</h2>
              <p>
                We take measures to protect your data but cannot guarantee full
                security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
              <p>
                You can request access, correction, or deletion of your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
              <p>Contact: support@classiccarcenter.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
